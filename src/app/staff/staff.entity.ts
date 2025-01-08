// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FileEntity, FileSchema } from 'src/shared/entities/file.entity';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

// ** Services
import { HashService } from 'src/shared/services/hash.service';

@Schema({ timestamps: true })
export class StaffEntity {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: FileSchema, required: false })
  image: FileEntity;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoleEntity',
    required: true,
  })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type StaffDocument = StaffEntity & Document & EntityId;
export const StaffSchema = SchemaFactory.createForClass(StaffEntity);

// ** Password encrypt
StaffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashService = new HashService();
  this.password = await hashService.hashPassword(this.password);
  next();
});
