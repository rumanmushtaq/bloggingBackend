// ** Nest
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// ** DTOS & Types
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from '../dtos/auth-request.dto';
import { SiteDocument } from 'src/app/site/entities/site.entity';
import { VerifyOtpPurposeEnum } from 'src/shared/enums/auth.enum';
import { IAuthenticatedUser } from 'src/shared/interfaces/auth.interface';
import { IpAndDevicePayload } from 'src/shared/interfaces/common.interface';
import {
  StaffloginResponse,
  UserloginResponse,
} from '../dtos/auth-response.dto';

// ** Services
import { OtpService } from './otp.service';
import { UserService } from 'src/app/user/user.service';
import { handleResponse } from 'src/utils/response-handler';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/shared/services/hash.service';
import { SessionHistoryService } from './session-history.service';
import { StaffService } from 'src/app/staff/staff.service';
import { PermissionService } from 'src/app/permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly sessionHistoryService: SessionHistoryService,
    private readonly staffService: StaffService,
    private readonly permissionService: PermissionService,
  ) {}

  //  Login
  async login(
    ipAndDevice: IpAndDevicePayload,
    site: SiteDocument,
    body: LoginDto,
  ) {
    try {
      const { password, email } = body;

      const user = await this.userService.findUserByCriteria({
        email,
        site: site?._id,
      });

      if (!user) throw new BadRequestException('Email or Password is invalid.');

      const matchPassword = await this.hashService.checkPassword(
        password,
        user.password,
      );

      if (!matchPassword)
        throw new BadRequestException('Email or Password is invalid.');

      // Check if the user's email is verified
      if (!user.isEmailVerified) {
        return {
          isEmailVerified: false,
          message: 'Please verify the code that was sent to your email.',
        };
      }

      // Validate the session and generate an access token
      const accessToken = await this.sessionHistoryService.validateSession(
        user._id,
        ipAndDevice,
      );

      return handleResponse('You have successfully logged in.', {
        accessToken,
        user: new UserloginResponse(user),
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Staff Login
  async staffLogin(ipAndDevice: IpAndDevicePayload, body: LoginDto) {
    try {
      const { password, email } = body;

      const staff = await this.staffService.findStaffWithRole({
        email,
      });

      if (!staff)
        throw new BadRequestException('Email or Password is invalid.');

      if (
        !staff?.role ||
        !staff.role?.permissions ||
        staff.role?.permissions?.length === 0
      )
        throw new ForbiddenException(
          'You have not been assigned any role or permission. Please contact the administrator',
        );

      const matchPassword = await this.hashService.checkPassword(
        password,
        staff.password,
      );

      if (!matchPassword)
        throw new BadRequestException('Email or Password is invalid.');

      const modules = await this.permissionService.findModuleByPermission(
        staff.role?.permissions,
      );

      // Validate the session and generate an access token
      const accessToken = await this.sessionHistoryService.validateSession(
        staff._id,
        ipAndDevice,
      );

      return handleResponse('You have successfully logged in.', {
        accessToken,
        user: new StaffloginResponse(staff),
        modules,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  // ** Verify Otp
  async verifyOtp(site: SiteDocument, body: VerifyOtpDto) {
    try {
      const { email, otp } = body;

      const isOtpExists = await this.otpService.findOtpByCriteria({
        email,
        otp,
      });

      if (!isOtpExists) throw new NotFoundException('Invalid OTP');

      const user = await this.userService.findUserByCriteria({
        email,
        site: site?._id,
      });

      if (!user) throw new NotFoundException('User does not exist.');

      await this.otpService.deleteOtpByCriteria({
        email,
        otp,
      });

      if (body.purpose === VerifyOtpPurposeEnum.REGISTER_ACCOUNT) {
        if (user.isEmailVerified)
          throw new ConflictException('Email already  verified.');

        user.isEmailVerified = true;
        await user.save();

        return handleResponse('Otp verified Successfully.');
      } else {
        const authToken = await this.jwtService.sign(body.email);

        return handleResponse('Otp verified Successfully.', {
          authToken,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // ** Resend Otp
  async resendOtp(email: string) {
    try {
      const isOtpExists = await this.otpService.findOtpByCriteria({ email });

      if (!isOtpExists) throw new NotFoundException('Otp does not exist');

      // delete old otp
      await this.otpService.deleteOtpByCriteria({
        email: isOtpExists.email,
        otp: isOtpExists.otp,
      });

      // generate otp
      const { otp } = await this.otpService.createOtp(email);

      // send otp to the user email
      // await this.emailService.sendOTPEmail({
      //   to: email,
      //   subject: 'Verifcation Code',
      //   otp,
      // });

      return handleResponse('OTP sent successfully');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // ** Forgot Password
  async forgotPassword(site: SiteDocument, body: ForgotPasswordDto) {
    try {
      const user = await this.userService.findUserByCriteria({
        email: body.email,
        site: site?._id,
      });

      if (!user) throw new NotFoundException('User does not exist.');

      // generate otp
      const { otp } = await this.otpService.createOtp(body.email);

      // send otp to the user email
      // await this.emailService.sendOTPEmail({
      //   to: body.email,
      //   subject: 'Verifcation Code',
      //   otp,
      // });

      return handleResponse('Password reset email has been sent successfully!');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // ** Reset Password
  async resetPassword(site: SiteDocument, body: ResetPasswordDto) {
    try {
      const tokenInfo = await this.jwtService.verify(body.token);

      const user = await this.userService.findUserByCriteria({
        email: tokenInfo.email,
        site: site?._id,
      });

      if (!user) throw new NotFoundException('User does not exist.');

      user.password = body.password;
      await user.save();

      return handleResponse(
        'Password has been changed successfully. Login to continue',
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // ** Change Password
  async changePassword(user: IAuthenticatedUser, body: ChangePasswordDto) {
    try {
      const { password, newPassword } = body;

      if (password === newPassword)
        throw new BadRequestException(
          'You have already used this password. Please choose a new one.',
        );

      const matchPassword = await this.hashService.checkPassword(
        password,
        user.password,
      );

      if (!matchPassword)
        throw new BadRequestException('Incorrect password. Please try again.');

      user.password = newPassword;
      await user.save();

      return handleResponse('Password has been changed successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
