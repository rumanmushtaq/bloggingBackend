// ** Nest
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// ** DTOS & Types
import { CreateModuleDto } from './dtos/module-request.dto';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { App_Permissions } from 'src/shared/enums/permission.enum';

// ** Services
import { ModuleService } from './module.service';

// ** Guards
import { StaffJwtGuard } from '../auth/guards/staffJwt.guard';
import { PermissionsGuard } from '../permission/guards/permission.guard';

@ApiTags('Module Management')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}
  @ApiOperation({ summary: 'Create a new module.' })
  @Post('create')
  async create(@Body() body: CreateModuleDto) {
    return await this.moduleService.create(body);
  }

  @ApiOperation({ summary: 'Get all module with permissions.' })
  @ApiBearerAuth()
  @UseGuards(StaffJwtGuard, PermissionsGuard)
  @Permissions(App_Permissions.Role.ADD, App_Permissions.Role.EDIT)
  @Get('with-permissions')
  async getAllModulesWithPermission() {
    return await this.moduleService.getAllModulesWithPermission();
  }
}
