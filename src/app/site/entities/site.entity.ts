// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class SiteEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type SiteDocument = SiteEntity & Document & EntityId;
export const SiteSchema = SchemaFactory.createForClass(SiteEntity);
