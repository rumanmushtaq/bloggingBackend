import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionQueries } from './permission.query';
import { PermissionController } from './permission.controller';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [ModuleModule],
  providers: [PermissionService, PermissionQueries],
  exports: [PermissionService, PermissionQueries],
  controllers: [PermissionController],
})
export class PermissionModule {}
