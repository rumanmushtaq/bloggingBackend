// ** Nest
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// ** Dtos & Types
import { CreateRoleDto } from './dtos/role-request.dto';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { App_Permissions } from 'src/shared/enums/permission.enum';

// ** Services
import { RoleService } from './role.service';

// ** Guards
import { StaffJwtGuard } from '../auth/guards/staffJwt.guard';
import { PermissionsGuard } from '../permission/guards/permission.guard';

@ApiTags('Role Management')
@ApiBearerAuth()
@UseGuards(StaffJwtGuard, PermissionsGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create a new role.' })
  @Permissions(App_Permissions.Role.ADD)
  @Post('create')
  async create(@Body() body: CreateRoleDto) {
    return await this.roleService.create(body);
  }

  @ApiOperation({ summary: 'Update a role.' })
  @Permissions(App_Permissions.Role.EDIT)
  @Put('update/:roleId')
  async update(@Param('roleId') roleId: string, @Body() body: CreateRoleDto) {
    return await this.roleService.update(roleId, body);
  }

  @ApiOperation({ summary: 'Get all roles.' })
  @Permissions(App_Permissions.Role.READ)
  @Get()
  async getAllRolesWithStaff() {
    return await this.roleService.getAllRolesWithStaff();
  }
}
