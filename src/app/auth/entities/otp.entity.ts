// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class OtpEntity {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: number;
}

export type OtpDocument = OtpEntity & Document & EntityId;
export const OtpSchema = SchemaFactory.createForClass(OtpEntity);
