// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class ModuleEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type ModuleDocument = ModuleEntity & Document & EntityId;
export const ModuleSchema = SchemaFactory.createForClass(ModuleEntity);
