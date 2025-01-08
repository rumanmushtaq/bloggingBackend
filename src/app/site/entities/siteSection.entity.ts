// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class SiteSectionEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SiteEntity',
    required: true,
  })
  site: mongoose.Schema.Types.ObjectId;
}

export type SiteSectionDocument = SiteSectionEntity & Document & EntityId;

export const SiteSectionSchema =
  SchemaFactory.createForClass(SiteSectionEntity);
