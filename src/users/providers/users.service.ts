import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';

import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/auth/providers/auth.service';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';

/**
 * Service responsible for managing users
 */
@Injectable()
export class UsersService {
  /**
   * Constructor of User service
   * @description Injects AuthService, UserRepository, and UsersCreateManyProvider
   * @param authService
   * @param userRepository
   * @param usersCreateMany
   */
  constructor(
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * The method to create a new user in the database
   * @param createUserDto
   * @returns newUser
   */
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      // Connect to db to find user
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Might save the details of the exception to db or log
      // Information which is sensitive
      throw new RequestTimeoutException(' ', {
        description: 'Database connection error',
      });
    }

    // Check if user already exists with same email
    // Handle exception
    if (existingUser) {
      throw new BadRequestException('User already exists. Use another email.');
    }

    // Create User
    let newUser = this.userRepository.create(createUserDto);

    try {
      // Connect to db to save new user
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to save user', {
        description: 'Database connection error',
      });
    }

    return newUser;
  }

  /**
   * The method to get all users form the database
   * @param id
   * @param page
   * @param limit
   * @returns an object containing data and message
   */
  public async findAll(query?: GetUsersQueryDto) {
    const { page, limit } = query;

    let foundUsers: User[] = [];

    try {
      const [users] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      foundUsers = users;
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!foundUsers.length) {
      throw new NotFoundException('Adjust page and limit query', {
        description: 'Users not found',
      });
    }

    const data = foundUsers.slice((page - 1) * limit, page * limit);

    return data;
  }

  /**
   * The method to find a single user by ID
   * @param id
   * @returns an empty array or an array of found user
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!user) {
      throw new NotFoundException('User id does not exist');
    }

    return user;
  }

  /**
   * The method to create many users
   * @param createUserDto Array of CreateUserDto
   * @returns an empty array or an array of found user
   */
  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
