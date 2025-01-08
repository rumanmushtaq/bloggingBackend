// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class RoleEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PermissionEntity',
    required: true,
  })
  permissions: mongoose.Schema.Types.ObjectId[];
}

export type RoleDocument = RoleEntity & Document & EntityId;
export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
