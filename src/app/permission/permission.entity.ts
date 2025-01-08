// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class PermissionEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ModuleEntity',
    required: true,
  })
  module: mongoose.Schema.Types.ObjectId;
}

export type PermissionDocument = PermissionEntity & Document & EntityId;
export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);
