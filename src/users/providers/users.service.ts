import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConflictException, RequestTimeoutException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';

import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { UpdateUserProvider } from './update-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { User } from '../entities/user.entity';
import { GoogleUser } from '../interfaces/google-user-interface';

import { AuthService } from 'src/auth/providers/auth.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

/**
 * Service responsible for managing users
 */
@Injectable()
export class UsersService {
  /**
   * Constructor of User service
   * @description Injects AuthService, UsersRepository, and UsersCreateManyProvider
   * @param authService
   * @param usersRepository
   * @param usersCreateMany
   */
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByEmailProvider: FindOneUserByEmailProvider,
    private readonly updateUserProvider: UpdateUserProvider,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  /**
   * The method to create a new user in the database
   * @param createUserDto
   * @returns User
   * @throws RequestTimeoutException or BadRequestException
   */
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * The method to create many users
   * @param createUserDto Array of CreateUserDto
   * @returns an empty array or an array of found user
   */
  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  /**
   * The method to update a new user in the database
   * @param patchUserDto
   * @returns User
   * @throws RequestTimeoutException or BadRequestException
   */
  public updateUser(patchUserDto: PatchUserDto): Promise<User> {
    return this.updateUserProvider.updateUser(patchUserDto);
  }

  /**
   * The method to get all users form the database
   * @param query
   * @returns User[]
   */
  public async findAll(query: GetUsersQueryDto) {
    const { page, limit } = query;

    try {
      // prettier-ignore
      const users = await this.paginationProvider.paginateQuery({ limit, page }, this.usersRepository);

      return users;
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }

  /**
   * The method to find a single user by ID
   * @param id
   * @returns an empty array or an array of found user
   */
  public async findOneById(id: number): Promise<User> {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!user) {
      throw new NotFoundException('User id not does not exist');
    }

    return user;
  }

  /**
   * The method to find a single user by email
   * @param email
   * @returns User
   * @throws RequestTimeOutException or UnauthorizedException
   */
  public async findOneByEmail(email: string): Promise<User> {
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }

  /**
   * The method to find a single user by googleId
   * @param googleId
   * @returns User
   */
  public async findOneByGoogleId(googleId: string) {
    return await this.usersRepository.findOneBy({ googleId });
  }

  /**
   * The method to create a new user using Google OAuth
   * @param googleUser
   * @returns User
   * @throws ConflictException
   */
  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.usersRepository.create({
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        googleId: googleUser.googleId,
        email: googleUser.email,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Could not create a new user',
      });
    }
  }
}
