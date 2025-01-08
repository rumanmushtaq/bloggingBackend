// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class SessionHistoryEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEntity',
    required: true,
  })
  userId: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ type: String, required: true })
  device: string;

  @Prop({ default: true })
  isActive: boolean;
}

export type SessionHistoryDocument = SessionHistoryEntity & Document & EntityId;
export const SessionHistorySchema =
  SchemaFactory.createForClass(SessionHistoryEntity);
