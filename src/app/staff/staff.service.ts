// ** Nest
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

// ** Entities
import { StaffDocument, StaffEntity } from './staff.entity';

// ** Services
import { StaffQueries } from './staff.query';

// ** DTOS & Types
import {
  CreateStaffDto,
  ResetStaffPasswordDto,
  UpdateStaffDto,
} from './dtos/staff-request.dto';
import { handleResponse } from 'src/utils/response-handler';

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
      const staff = await this.staffModel.findOneAndUpdate(
        { _id: staffId },
        {
          $set: {
            name: body.name,
            email: body.email,
            role: body.role,
          },
        },
        { new: true },
      );

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

  // Find staff with role
  async findStaffWithRole(criteria: Partial<StaffDocument>) {
    const query = await this.staffQueries.findStaffWithRole(criteria);
    const [staff] = await this.staffModel.aggregate(query);
    return staff;
  }

  // Find Staff By Criteria
  async findStaffByCriteria(criteria: Partial<StaffDocument>) {
    return await this.staffModel.findOne(criteria);
  }
}
