import { Injectable } from '@nestjs/common';

/**
 * Service for application
 */
@Injectable()
export class AppService {
  /**
   * Get a hello message
   * @returns {string} A hello message
   */
  getHello(): string {
    return 'Hello World!';
  }
}
