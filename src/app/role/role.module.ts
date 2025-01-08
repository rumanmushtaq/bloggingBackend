import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleQueries } from './role.query';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleQueries],
  exports: [RoleService, RoleQueries],
})
export class RoleModule {}
