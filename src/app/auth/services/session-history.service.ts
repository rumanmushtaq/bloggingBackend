// ** Nest
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  SessionHistoryDocument,
  SessionHistoryEntity,
} from '../entities/session-history.entity';

// ** Types
import { IAccessTokenPayload } from 'src/shared/interfaces/auth.interface';
import { IpAndDevicePayload } from 'src/shared/interfaces/common.interface';

@Injectable()
export class SessionHistoryService {
  constructor(
    @InjectModel(SessionHistoryEntity.name)
    private readonly sessionHistoryModel: Model<SessionHistoryDocument>,
    private readonly jwtService: JwtService,
  ) {}

  //  Validate session
  async validateSession(userId: ObjectId, ipAndDevice: IpAndDevicePayload) {
    try {
      const { ip, device } = ipAndDevice;
      const isSessionExist = await this.sessionHistoryModel.findOne({
        userId,
        ip,
        device,
      });

      //   Validate if session exist
      if (isSessionExist) {
        const accessToken = await this.generateAccessToken({
          id: userId,
          sessionId: isSessionExist._id,
        });

        isSessionExist.updatedAt = new Date();
        await isSessionExist.save();
        return accessToken;
      }

      //   Create new session
      const newSession = await this.sessionHistoryModel.create({
        userId,
        ...ipAndDevice,
      });

      const accessToken = await this.generateAccessToken({
        id: userId,
        sessionId: newSession._id,
      });

      return accessToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //  Generate access token
  async generateAccessToken(payload: IAccessTokenPayload) {
    return await this.jwtService.sign(payload);
  }

  // Authenticate Session
  async authenticateSession(sessionId: ObjectId) {
    const isSession = await this.sessionHistoryModel.findOne({
      _id: sessionId,
      isActive: true,
    });

    return !!isSession;
  }
}
