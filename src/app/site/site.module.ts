import { Global, Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteGuard } from './guards/site.guard';

@Global()
@Module({
  providers: [SiteService, SiteGuard],
  exports: [SiteService, SiteGuard],
})
export class SiteModule {}
