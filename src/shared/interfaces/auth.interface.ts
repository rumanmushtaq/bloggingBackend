import mongoose from 'mongoose';
import { UserEntity } from 'src/app/user/user.entity';

export interface IAccessTokenPayload {
  id?: mongoose.Schema.Types.ObjectId;
  sessionId?: mongoose.Schema.Types.ObjectId;
  email?: string;
}

export type IAuthenticatedUser = UserEntity & mongoose.Document;
