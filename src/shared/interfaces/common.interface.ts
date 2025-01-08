import mongoose from 'mongoose';

export interface EntityId {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IpAndDevicePayload {
  ip: string;
  device: string;
}
