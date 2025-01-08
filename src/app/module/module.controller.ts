// ** Nest
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// ** DTOS & Types
import { CreateModuleDto } from './dtos/module-request.dto';

// ** Services
import { ModuleService } from './module.service';

@ApiTags('Module Management')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}
  @ApiOperation({ summary: 'Create a new module.' })
  @Post('create')
  async create(@Body() body: CreateModuleDto) {
    return await this.moduleService.create(body);
  }
}
