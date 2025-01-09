import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { ModuleQueries } from './module.query';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService, ModuleQueries],
  exports: [ModuleService, ModuleQueries],
})
export class ModuleModule {}
