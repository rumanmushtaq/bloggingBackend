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

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(ModuleEntity.name)
    private readonly roleModel: Model<ModuleDocument>,
  ) {}

  // create module
  async create(body: CreateModuleDto) {
    try {
      await this.roleModel.create(body);
      return handleResponse('Module created successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find Module By Criteria
  async findModuleByCriteria(criteria: Partial<ModuleDocument>) {
    return await this.roleModel.findOne(criteria);
  }
}
