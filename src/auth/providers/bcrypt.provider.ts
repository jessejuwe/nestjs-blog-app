import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HashingProvider } from './hashing.provider';

/**
 * Service for providing hashing implementation
 */
@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // Generate a salt for bcrypt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data, salt);

    // Return the hashed password
    return hashedPassword;
  }

  // prettier-ignore
  public async comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    // Compare the password to the encrypted password
    const isMatch = await bcrypt.compare(data, encrypted);

    // Return the match
    return isMatch;
  }
}
