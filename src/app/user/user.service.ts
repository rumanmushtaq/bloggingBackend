// ** Nest
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// ** DTOS
import { CreateUserDto } from './dtos/user-request.dto';

// ** Entities
import { SiteDocument } from '../site/entities/site.entity';
import { UserDocument, UserEntity } from './user.entity';

// ** Services
import { OtpService } from '../auth/services/otp.service';
import { EmailService } from '../auth/services/email.service';
import { handleResponse } from 'src/utils/response-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}
  // create a new user
  async createUser(site: SiteDocument, body: CreateUserDto) {
    try {
      const existingUser = await this.findUserByCriteria({
        email: body.email,
        site: site._id,
        isDeleted: false,
      });

      if (existingUser) throw new ConflictException('User is already exist.');

      // new user create
      await this.userModel.create({
        ...body,
        site: site._id,
      });

      // generate otp
      const { otp } = await this.otpService.createOtp(body.email);

      // send otp to the user email
      await this.emailService.sendOTPEmail({
        name: body.name,
        to: body.email,
        subject: 'Verifcation Code',
        otp,
      });

      return handleResponse('User created successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find User By Criteria
  async findUserByCriteria(criteria: Partial<UserDocument>) {
    return await this.userModel.findOne(criteria);
  }
}
