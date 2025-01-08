// ** Nest
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

// ** Dtos
import { CreateUserDto } from './dtos/user-request.dto';

// ** Services
import { UserService } from './user.service';

// ** Constants
import { X_SITE_ID } from 'src/constants/values.constants';

// ** Guards
import { SiteGuard } from '../site/guards/site.guard';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Sign Up a new user' })
  @ApiHeader({ name: X_SITE_ID, required: true })
  @UseGuards(SiteGuard)
  @Post('signup')
  async createUser(@Req() req, @Body() body: CreateUserDto) {
    return await this.userService.createUser(req.site, body);
  }
}
