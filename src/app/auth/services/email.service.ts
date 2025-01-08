// ** Nest
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  ISendEmail,
  ISendOTPEmailPayload,
} from 'src/shared/interfaces/email.interface';
import { OtpEmailTemplate } from 'src/templates/otpEmailTemplate';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  // Send Otp Email
  async sendOTPEmail(payload: ISendOTPEmailPayload) {
    try {
      const { name, to, subject, otp } = payload;

      // get opt email template
      const otpEmailTemplate = OtpEmailTemplate(name, otp);

      // send email
      await this.sendEmail({
        to,
        subject,
        html: otpEmailTemplate,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Send Email
  private async sendEmail(payload: ISendEmail) {
    const { to, subject, html } = payload;
    const FROM_EMAIL = await this.configService.get<string>('FROM_EMAIL');

    return await this.transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
  }
}
