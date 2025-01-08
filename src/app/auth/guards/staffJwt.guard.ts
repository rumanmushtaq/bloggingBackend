import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategiesEnum } from 'src/shared/enums/auth.enum';

@Injectable()
export class StaffJwtGuard extends AuthGuard(StrategiesEnum.STAFFJWT) {}
