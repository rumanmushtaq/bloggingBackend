// ** Nest
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import mongoose from 'mongoose';
import { PERMISSIONS_KEY } from 'src/constants/values.constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const staff = request.user;

    if (!staff) {
      throw new UnauthorizedException('Staff does not exist.');
    }

    if (!staff.role)
      throw new ForbiddenException(
        'You have not been assigned any role. Please contact the administrator',
      );

    const staffPermissions = staff.role.permissions || [];

    const staffPermissionSet = new Set(staffPermissions?.map(String));
    const hasPermission = requiredPermissions?.every((permission) =>
      staffPermissionSet?.has(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
