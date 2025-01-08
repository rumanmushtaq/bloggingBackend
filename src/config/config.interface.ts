export interface ConfigInterface {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  DB_URL: string;
  SALT_OR_ROUNDS: number;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  FROM_EMAIL: string;
  JWT_SECRET: string;
  EXPIRES_IN: string;
}
