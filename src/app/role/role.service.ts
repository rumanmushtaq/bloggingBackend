// ** Nest
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

// ** DTOS & Types
import { CreateRoleDto } from './dtos/role-request.dto';
import { InjectModel } from '@nestjs/mongoose';

// ** Entities
import { RoleDocument, RoleEntity } from './role.entity';
import { handleResponse } from 'src/utils/response-handler';

// ** Services
import { RoleQueries } from './role.query';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleDocument>,
    private readonly roleQueries: RoleQueries,
  ) {}

  // create role
  async create(body: CreateRoleDto) {
    try {
      const existingRole = await this.roleModel.findOne({
        title: body.title,
      });

      if (existingRole)
        throw new ConflictException('Role with this title already exists.');

      const newRole = await this.roleModel.create(body);

      return handleResponse('Role created successfully.', newRole);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // update role
  async update(roleId: string, body: CreateRoleDto) {
    try {
      const existingRole = await this.roleModel.findOne({
        _id: roleId,
        isAdmin: false,
      });

      if (!existingRole) throw new NotFoundException('Role does not exist.');

      const duplicateRole = await this.roleModel.findOne({
        title: body.title,
        _id: { $ne: roleId },
      });

      if (duplicateRole)
        throw new ConflictException('Role with this title already exists.');

      await this.roleModel.findByIdAndUpdate(
        roleId,
        {
          $set: body,
        },
        { new: true },
      );

      return handleResponse('Role updated successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // get all roles
  async getAllRolesWithStaff() {
    try {
      const query = await this.roleQueries.getAllRolesWithStaff();
      return await this.roleModel.aggregate(query);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
