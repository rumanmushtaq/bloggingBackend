// ** Nest
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// ** DTOS & Types
import { CreateModuleDto } from './dtos/module-request.dto';

// ** Entities
import { ModuleDocument, ModuleEntity } from './module.entity';

// ** Utils
import { handleResponse } from 'src/utils/response-handler';

// ** Services
import { ModuleQueries } from './module.query';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(ModuleEntity.name)
    private readonly moduleModel: Model<ModuleDocument>,
    private readonly moduleQueries: ModuleQueries,
  ) {}

  // create module
  async create(body: CreateModuleDto) {
    try {
      await this.moduleModel.create(body);
      return handleResponse('Module created successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // All modules with permission
  async getAllModulesWithPermission() {
    try {
      const query = await this.moduleQueries.getAllModuleWithPermission();
      const data = await this.moduleModel.aggregate(query);
      return handleResponse('Module fetch successfully.', data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find Module By Criteria
  async findModuleByCriteria(criteria: Partial<ModuleDocument>) {
    return await this.moduleModel.findOne(criteria);
  }
}
