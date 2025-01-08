import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategiesEnum } from 'src/shared/enums/auth.enum';

@Injectable()
export class UserJwtGuard extends AuthGuard(StrategiesEnum.USERJWT) {}
