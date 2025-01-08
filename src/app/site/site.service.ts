// ** Nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// ** Entities
import { SiteDocument, SiteEntity } from './entities/site.entity';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel(SiteEntity.name)
    private readonly siteModel: Model<SiteDocument>,
  ) {}

  // Find Site By Criteria
  async findSiteByCriteria(criteria: Partial<SiteDocument>) {
    return await this.siteModel.findOne(criteria);
  }
}
