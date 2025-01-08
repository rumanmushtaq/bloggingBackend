// ** Third Parties
import * as bcrypt from 'bcrypt';

// ** Nest
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, 10);
  }
}
