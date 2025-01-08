// ** Nest
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';

// ** Services
import { EmailService } from './services/email.service';
import { OtpService } from './services/otp.service';
import { AuthService } from './services/auth.service';
import { SessionHistoryService } from './services/session-history.service';

// ** Types
import { StrategiesEnum } from 'src/shared/enums/auth.enum';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { StaffJwtStrategy } from './strategies/staffJwt.strategy';
import { UserJwtStrategy } from './strategies/userJwt.strategy';
import { StaffModule } from '../staff/staff.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    StaffModule,
    PermissionModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    EmailService,
    OtpService,
    AuthService,
    SessionHistoryService,
    StaffJwtStrategy,
    UserJwtStrategy,
  ],
  exports: [EmailService, OtpService, AuthService, SessionHistoryService],
})
export class AuthModule {}
