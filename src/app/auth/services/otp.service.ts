// ** Nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// ** Entities
import { OtpDocument, OtpEntity } from '../entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(OtpEntity.name)
    private readonly otpModel: Model<OtpDocument>,
  ) {}

  // ** Create Otp
  async createOtp(email: string) {
    const otp = await this.generateOtp();
    return this.otpModel.create({
      email,
      otp,
    });
  }

  // Find Otp By Criteria
  async findOtpByCriteria(criteria: Partial<OtpDocument>) {
    return await this.otpModel.findOne(criteria);
  }

  // ** Delete Otp by criteria
  async deleteOtpByCriteria(criteria: Partial<OtpDocument>) {
    return this.otpModel.deleteOne(criteria);
  }

  // ** Generate Otp
  async generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  }
}
