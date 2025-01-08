// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class BlogDistributionEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogEntity',
    required: true,
  })
  blog: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SiteEntity',
    required: true,
  })
  site: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SiteSectionEntity',
    required: true,
  })
  siteSection: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type BlogDistributionDocument = BlogDistributionEntity &
  Document &
  EntityId;

export const BlogDistributionSchema = SchemaFactory.createForClass(
  BlogDistributionEntity,
);
