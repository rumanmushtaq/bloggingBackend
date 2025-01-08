import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { VerifyOtpPurposeEnum } from 'src/shared/enums/auth.enum';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class VerifyOtpDto extends PickType(LoginDto, ['email'] as const) {
  @ApiProperty()
  @IsNotEmpty({ message: 'Otp is required' })
  @Type(() => Number)
  @IsNumber()
  @Min(1000, { message: 'Otp must be at least 4 digits' })
  otp: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Purpose is required' })
  @IsEnum(VerifyOtpPurposeEnum)
  purpose: VerifyOtpPurposeEnum;
}

export class ResendOtpDto extends PickType(LoginDto, ['email'] as const) {}
export class ForgotPasswordDto extends PickType(LoginDto, ['email'] as const) {}

export class ResetPasswordDto extends PickType(LoginDto, [
  'password',
] as const) {
  @ApiProperty()
  @IsNotEmpty({ message: 'Token is required' })
  @IsString()
  token: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'New Password is required' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
