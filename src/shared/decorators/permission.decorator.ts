import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from 'src/constants/values.constants';
import { App_Permissions } from 'src/shared/enums/permission.enum';

export const Permissions = (...permissions: App_Permissions.AllPermissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
