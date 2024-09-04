import { Injectable } from '@nestjs/common';
import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

/**
 * Provider for finding one user by email
 */
@Injectable()
export class FindOneUserByEmailProvider {
  /**
   * Constructor of FindOneUserByEmailProvider
   * @param userRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Finds one user by email
   * @param email
   * @returns User
   * @throws UnauthorizedException or RequestTimeoutException
   */
  public async findOneByEmail(email: string): Promise<User> {
    let user: User | undefined = undefined;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    // Check if user already exists with same email
    // Handle exception
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
