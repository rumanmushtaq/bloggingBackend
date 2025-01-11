// ** Nest
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

// ** Guards
import { StaffJwtGuard } from '../auth/guards/staffJwt.guard';
import { PermissionsGuard } from '../permission/guards/permission.guard';

// ** DTOS & Types
import { App_Permissions } from 'src/shared/enums/permission.enum';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import {
  CreateStaffDto,
  GetAllOtherStaffDto,
  ResetStaffPasswordDto,
  UpdateStaffDto,
} from './dtos/staff-request.dto';

// ** Services
import { StaffService } from './staff.service';

@ApiTags('Staff Management')
@ApiBearerAuth()
@UseGuards(StaffJwtGuard, PermissionsGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'Create a new Staff.' })
  @Permissions(App_Permissions.Staff.ADD)
  @Post('create')
  async create(@Body() body: CreateStaffDto) {
    return await this.staffService.create(body);
  }

  @ApiOperation({ summary: 'Update a Staff.' })
  @Permissions(App_Permissions.Staff.EDIT)
  @Put('update/:staffId')
  async update(
    @Param('staffId') staffId: string,
    @Body() body: UpdateStaffDto,
  ) {
    return await this.staffService.update(staffId, body);
  }

  @ApiOperation({ summary: 'Get all staffs excluding the logged-in staff' })
  @Permissions(App_Permissions.Staff.READ)
  @Get('others')
  async getAllOtherStaffs(@Req() req, @Query() query: GetAllOtherStaffDto) {}

  @ApiOperation({ summary: 'Reset the password of a staff member.' })
  @Permissions(App_Permissions.Staff.RESET_PASSWORD)
  @Put('reset-password/:staffId')
  async resetStaffPassword(
    @Param('staffId') staffId: ObjectId,
    @Body() body: ResetStaffPasswordDto,
  ) {
    return await this.staffService.resetStaffPassword(staffId, body);
  }
}
