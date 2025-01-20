// ** Nest
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model, ObjectId } from 'mongoose';

// ** Entities
import { StaffDocument, StaffEntity } from './staff.entity';

// ** Services
import { StaffQueries } from './staff.query';

// ** DTOS & Types
import {
  CreateStaffDto,
  GetAllOtherStaffDto,
  ResetStaffPasswordDto,
  UpdateStaffDto,
} from './dtos/staff-request.dto';
import { handleResponse } from 'src/utils/response-handler';
import { IAuthenticatedStaff } from 'src/shared/interfaces/auth.interface';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(StaffEntity.name)
    private readonly staffModel: Model<StaffDocument>,
    private readonly staffQueries: StaffQueries,
  ) {}

  // Create staff
  async create(body: CreateStaffDto) {
    try {
      const existingStaff = await this.findStaffByCriteria({
        email: body.email,
      });

      if (existingStaff) throw new ConflictException('Staff is already exist.');

      await this.staffModel.create(body);

      return handleResponse('Staff created successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update staff
  async update(staffId: string, body: UpdateStaffDto) {
    try {
      const staff = await this.staffModel
        .findOneAndUpdate(
          { _id: staffId },
          {
            $set: {
              name: body.name,
              email: body.email,
              role: body.role,
            },
          },
          { new: true },
        )
        .populate('role')
        .select('-password');

      if (!staff) throw new NotFoundException('Staff does not exist.');

      return handleResponse('Staff updated successfully.', staff);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Reset staff password
  async resetStaffPassword(staffId: ObjectId, body: ResetStaffPasswordDto) {
    try {
      const staff = await this.findStaffByCriteria({
        _id: staffId,
      });

      if (!staff) throw new NotFoundException('Staff does not exist.');

      staff.password = body.password;
      await staff.save();

      return handleResponse('Reset Staff password successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all  others staff
  async getAllOtherStaffs(
    staff: IAuthenticatedStaff,
    query: GetAllOtherStaffDto,
  ) {
    try {
      const _page = query.page;
      const _limit = query.limit;
      const _skip = _page * _limit;

      const criteria = {
        _id: { $ne: new mongoose.Types.ObjectId(staff._id?.toString()) } as any,
        ...(query.name && {
          name: { $regex: new RegExp(query.name, 'i') } as any,
        }),
        ...(query.role && {
          role: new mongoose.Types.ObjectId(query.role) as any,
        }),
        isBlocked: query.isBlocked,
      };

      const finalQuery = await this.staffQueries.findStaffWithRole(criteria);

      const staffs = await this.staffModel
        .aggregate([
          ...finalQuery,
          {
            $project: {
              password: 0,
            },
          },
        ])
        .sort({ createdAt: -1 })
        .skip(_skip)
        .limit(_limit);

      const totalCount = await this.staffModel.countDocuments(criteria);

      return handleResponse('Get others Staffs list.', {
        staffs,
        total: totalCount,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find staff with role
  async findStaffWithRole(criteria: Partial<StaffDocument>) {
    const query = await this.staffQueries.findStaffWithRole(criteria);
    const [staff] = await this.staffModel.aggregate(query);
    return staff;
  }

  // Find Staff By Criteria
  async findStaffByCriteria(criteria: FilterQuery<StaffDocument>) {
    return await this.staffModel.findOne(criteria);
  }
}
