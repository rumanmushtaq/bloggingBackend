// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// ** Types
import { SocialType } from 'src/shared/enums/social.enum';
import { EntityId } from 'src/shared/interfaces/common.interface';

// ** Services
import { HashService } from 'src/shared/services/hash.service';

@Schema({ timestamps: true })
export class UserEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: SocialType.Normal })
  loginAs: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SiteEntity',
    required: true,
  })
  site: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type UserDocument = UserEntity & Document & EntityId;
export const UserSchema = SchemaFactory.createForClass(UserEntity);

// ** Password encrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashService = new HashService();
  this.password = await hashService.hashPassword(this.password);
  next();
});
