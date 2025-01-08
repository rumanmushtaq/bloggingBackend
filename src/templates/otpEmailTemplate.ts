export function OtpEmailTemplate(name: string, otp: number) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #dddddd;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
              margin: 20px 0;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #555555;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">Your OTP Code</div>
            <p>Dear ${name},</p>
            <p>We received a request to verify your email. Use the OTP below to complete the verification process.</p>
            <div class="otp">${otp}</div>
            <p>If you did not request this, please ignore this email.</p>
            <div class="footer">
              Thank you,<br>
              The Team
            </div>
          </div>
        </body>
        </html>
      `;
}
