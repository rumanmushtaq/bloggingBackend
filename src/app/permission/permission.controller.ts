// ** Nest
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// ** DTOS & Types
import { CreatePermissionDto } from './dtos/permission-request.dto';

// ** Services
import { PermissionService } from './permission.service';

@ApiTags('Permission Management')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create a new permission.' })
  @Post('create')
  async create(@Body() body: CreatePermissionDto) {
    return await this.permissionService.create(body);
  }
}
