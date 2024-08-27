import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Service responsible for managing users
 */
@Injectable()
export class UsersService {
  /**
   * Constructor of User service
   * @description Injects AuthService and UserRepository
   * @param authService
   * @param userRepository
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * The method to create a new user in the database
   * @description The method to create a new user in the database
   * @param createUserDto
   * @returns newUser
   */
  public async createUser(createUserDto: CreateUserDto) {
    try {
      // Check if user already exists with same email
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      // TODO: Handle exception
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      // Create User
      let newUser = this.userRepository.create(createUserDto);
      newUser = await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to get all users form the database
   * @description The method to get all users form the database
   * @param id
   * @param page
   * @param limit
   * @returns an object containing data and message
   */
  public async findAll(id?: number, query?: GetUsersQueryDto) {
    const { page, limit } = query;

    try {
      if (id) {
        const response = await this.findOneById(id);
        return response;
      }

      const [users] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      if (!users.length) {
        throw new NotFoundException('No users found');
      }

      const data = users.slice((page - 1) * limit, page * limit);

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to find a single user by ID
   * @description The method to find a single user by ID
   * @param id
   * @returns an empty array or an array of found user
   */
  public async findOneById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('No user found');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
