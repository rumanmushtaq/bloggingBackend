// ** Nest
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// ** Entities
import { PermissionDocument, PermissionEntity } from './permission.entity';

// ** Services
import { PermissionQueries } from './permission.query';
import { ModuleService } from '../module/module.service';

// ** DTOS & Types
import { CreatePermissionDto } from './dtos/permission-request.dto';

// ** Utils
import { handleResponse } from 'src/utils/response-handler';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionDocument>,
    private readonly permissionQueries: PermissionQueries,
    private readonly moduleService: ModuleService,
  ) {}

  // create module
  async create(body: CreatePermissionDto) {
    try {
      const module = await this.moduleService.findModuleByCriteria({
        _id: body.module as any,
      });

      if (!module) throw new NotFoundException('Module does not exist.');

      await this.permissionModel.create(body);

      return handleResponse('Permission created successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  // find modules by permission
  async findModuleByPermission(permissionIds: string[]) {
    const query =
      await this.permissionQueries.findModuleByPermission(permissionIds);
    return await this.permissionModel.aggregate(query);
  }
}
