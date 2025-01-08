import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SiteService } from 'src/app/site/site.service';
import { X_SITE_ID } from 'src/constants/values.constants';

@Injectable()
export class SiteGuard implements CanActivate {
  constructor(private readonly siteService: SiteService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const siteId = request.headers[X_SITE_ID];

      if (!siteId)
        throw new BadRequestException('x-site-id is required in header');

      const site = await this.siteService.findSiteByCriteria({ _id: siteId });

      if (!site) throw new BadRequestException('Site does not exist.');

      request.site = site;
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
