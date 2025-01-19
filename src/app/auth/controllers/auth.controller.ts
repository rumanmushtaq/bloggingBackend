// ** Nest
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// ** Services
import { AuthService } from '../services/auth.service';

// ** DTOS
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResendOtpDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from '../dtos/auth-request.dto';
import { IpAndDevicePayload } from 'src/shared/interfaces/common.interface';

// ** Constants
import {
  X_CLIENT_DEVICE,
  X_CLIENT_IP,
  X_SITE_ID,
} from 'src/constants/values.constants';

// ** Guards
import { SiteGuard } from 'src/app/site/guards/site.guard';
import { UserJwtGuard } from '../guards/userJwt.guard';
import { IpAndDevice } from 'src/shared/decorators/ip-device.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiHeader({ name: X_CLIENT_IP, required: true })
  @ApiHeader({ name: X_CLIENT_DEVICE, required: true })
  @ApiHeader({ name: X_SITE_ID, required: true })
  @UseGuards(SiteGuard)
  @Post('login')
  async login(
    @Req() req,
    @Body() body: LoginDto,
    @IpAndDevice() ipAndDevice: IpAndDevicePayload,
  ) {
    
    return await this.authService.login(ipAndDevice, req.site, body);
  }

  @ApiOperation({ summary: 'Staff Login' })
  @ApiHeader({ name: X_CLIENT_IP, required: true })
  @ApiHeader({ name: X_CLIENT_DEVICE, required: true })
  @Post('staff/login')
  async staffLogin(
    @Body() body: LoginDto,
    @IpAndDevice() ipAndDevice: IpAndDevicePayload,
  ) {
    return await this.authService.staffLogin(ipAndDevice, body);
  }

  @ApiOperation({ summary: 'Verify Otp' })
  @ApiHeader({ name: X_SITE_ID, required: true })
  @UseGuards(SiteGuard)
  @Post('verify-otp')
  async verifyOtp(@Req() req, @Body() body: VerifyOtpDto) {
    return await this.authService.verifyOtp(req.site, body);
  }

  @ApiOperation({ summary: 'Resend Otp' })
  @Post('resend-otp')
  async resendOtp(@Body() body: ResendOtpDto) {
    return await this.authService.resendOtp(body.email);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @ApiHeader({ name: X_SITE_ID, required: true })
  @UseGuards(SiteGuard)
  @Post('forgot-password')
  async forgotPassword(@Req() req, @Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(req.site, body);
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiHeader({ name: X_SITE_ID, required: true })
  @UseGuards(SiteGuard)
  @Post('reset-password')
  async resetPassword(@Req() req, @Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(req.site, body);
  }

  @ApiOperation({ summary: 'Change password' })
  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  @Post('change-password')
  async changePassword(@Req() req, @Body() body: ChangePasswordDto) {
    return await this.authService.changePassword(req.user, body);
  }
}
