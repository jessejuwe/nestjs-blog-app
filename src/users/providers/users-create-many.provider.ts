import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

/**
 * Service responsible for creating multiple users
 */
@Injectable()
export class UsersCreateManyProvider {
  /**
   * Constructor of UsersCreateManyProvider
   * @description Injects DataSource
   * @param dataSource
   */

  constructor(private readonly dataSource: DataSource) {}

  /**
   * The method to create multiple users in the database
   * @param createManyUsersDto
   * @returns User[]
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    // Create a QueryRunner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect QueryRunner to database
      await queryRunner.connect();
      // Begin transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    const newUsers: User[] = [];

    try {
      createManyUsersDto.users.forEach(async (user) => {
        const existingUser = await queryRunner.manager.findOne(User, {
          where: { email: user.email },
        });

        if (existingUser) {
          throw new ConflictException('User already exists', {
            description: 'User with same email already exists',
          });
        }

        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      });

      // Commit if successful
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback if unsuccessful
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Transaction failed to complete', {
        description: String(error),
      });
    } finally {
      try {
        // Release QueryRunner
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Unable to release connection', {
          description: String(error),
        });
      }
    }

    return newUsers;
  }
}
