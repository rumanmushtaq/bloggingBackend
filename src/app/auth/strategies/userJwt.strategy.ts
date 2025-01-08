// ** Nest
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// ** Services
import { UserService } from 'src/app/user/user.service';
import { SessionHistoryService } from '../services/session-history.service';
import { ConfigService } from '@nestjs/config';

// ** Types
import { IAccessTokenPayload } from 'src/shared/interfaces/auth.interface';
import { StrategiesEnum } from 'src/shared/enums/auth.enum';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  StrategiesEnum.USERJWT,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
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
    const user = await this.userService.findUserByCriteria({
      _id: payload.id as any,
    });

    // Authenticate session
    const isSession = await this.sessionHistoryService.authenticateSession(
      payload.sessionId,
    );

    if (!user || !isSession) throw new UnauthorizedException();

    return user;
  }
}
