// ** Nest
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// ** Guards
import { StaffJwtGuard } from '../auth/guards/staffJwt.guard';
import { PermissionsGuard } from '../permission/guards/permission.guard';

// ** DTOS & Types
import { App_Permissions } from 'src/shared/enums/permission.enum';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { CreateBlogDto } from './dtos/blog-request.dto';

@ApiTags('Blog Management')
@ApiBearerAuth()
@UseGuards(StaffJwtGuard, PermissionsGuard)
@Controller('blog')
export class BlogController {
  @ApiOperation({ summary: 'Create a new blog.' })
  @Permissions(App_Permissions.Category.ADD)
  @Post('create')
  async create(@Body() body: CreateBlogDto) {}
}
