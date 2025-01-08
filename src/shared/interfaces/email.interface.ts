export interface ISendEmail {
  to: string;
  subject: string;
  html: any;
}

export interface ISendOTPEmailPayload {
  name: string;
  to: string;
  subject: string;
  otp: number;
}
