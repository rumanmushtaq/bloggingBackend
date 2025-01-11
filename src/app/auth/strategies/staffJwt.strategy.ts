// ** Nest
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// ** Services
import { ConfigService } from '@nestjs/config';
import { StaffService } from 'src/app/staff/staff.service';
import { SessionHistoryService } from '../services/session-history.service';

// ** Types
import { StrategiesEnum } from 'src/shared/enums/auth.enum';
import { IAccessTokenPayload } from 'src/shared/interfaces/auth.interface';
import mongoose from 'mongoose';

@Injectable()
export class StaffJwtStrategy extends PassportStrategy(
  Strategy,
  StrategiesEnum.STAFFJWT,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly staffService: StaffService,
    private readonly sessionHistoryService: SessionHistoryService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(req: Request, payload: IAccessTokenPayload) {
    const staff = await this.staffService.findStaffWithRole({
      _id: new mongoose.Types.ObjectId(payload.id?.toString()) as any,
    });

    // Authenticate session
    const isSession = await this.sessionHistoryService.authenticateSession(
      payload.sessionId,
    );

    if (!staff || !isSession) throw new UnauthorizedException();

    if (staff.isBlocked)
      throw new BadRequestException(
        'This account is currently blocked. Please contact the administrator.',
      );

    if (!staff?.role)
      throw new ForbiddenException(
        'You have not been assigned any role. Please contact the administrator.',
      );

    return staff;
  }
}
