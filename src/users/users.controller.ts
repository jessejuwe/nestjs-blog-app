import { Controller, Param, Query } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Body, Delete, Get, Patch, Post } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

import { CreateUserDto } from './dtos/create-user.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

import { createSuccessResponse } from 'src/common/response/util/success-response.util';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

/**
 * Controller responsible for handling users data
 */
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Route for handling get users request
   * @param getUsersQueryDto A DTO used to validate incoming GET request queries
   * @example HTTP GET /users
   * @returns User[]
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiQuery({
    name: 'getUsersQueryDto',
    required: false,
    type: GetUsersQueryDto,
    description: 'User Query DTO',
    example: { page: 1, limit: 10 },
  })
  public getUsers(@Query() getUsersQueryDto: GetUsersQueryDto) {
    return this.usersService.findAll(getUsersQueryDto);
  }

  /**
   * Route for handling get user request
   * @param getUsersParamDto A DTO used to validate incoming GET request param
   * @example HTTP GET /user
   * @returns User
   */
  @Get(':id')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Get a user with id' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiParam({
    name: 'getUsersParamDto',
    required: true,
    type: GetUsersParamDto,
    description: 'User Param DTO',
    example: { id: 1 },
  })
  public async getUser(@Param() getUsersParamDto: GetUsersParamDto) {
    const user = await this.usersService.findOneById(getUsersParamDto.id);
    return createSuccessResponse('User fetched successfully', true, user);
  }

  /**
   * Route for handling create user request
   * @param createUserDto A DTO used to validate incoming POST request
   * @example HTTP POST /user
   * @returns response
   */
  @Post()
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({
    required: true,
    type: CreateUserDto,
    description: 'Create User DTO',
  })
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return createSuccessResponse('User created successfully', true, user);
  }

  /**
   * Route for handling create many users request
   * @param createUserDto An array of CreateUserDto used to validate incoming POST request
   * @example HTTP POST /user
   * @returns response
   */
  @Post('create-many')
  @ApiOperation({ summary: 'Create many users' })
  @ApiResponse({ status: 201, description: 'Users created successfully' })
  @ApiBody({
    required: true,
    type: CreateManyUsersDto,
    description: 'Create many users DTO',
  })
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createManyUsers(createManyUsersDto);
  }

  /**
   * Route for handling patch user request
   * @param patchUserDto A DTO used to validate incoming PATCH request
   * @example HTTP PATCH /user
   * @returns response
   */
  @Patch()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiBody({
    required: true,
    type: PatchUserDto,
    description: 'Patch User DTO',
  })
  public async patchUser(@Body() patchUserDto: PatchUserDto) {
    const user = await this.usersService.updateUser(patchUserDto);
    return createSuccessResponse('User updated successfully', true, user);
  }

  /**
   * Route for handling delete user request
   * @param id number describing the ID of user
   * @example HTTP DELETE /user/1
   * @returns response
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'User ID',
    example: 1,
  })
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return id;
  }

  /**
   * Route for handling soft delete user request
   * @param id number describing the ID of user
   * @example HTTP DELETE /user/1
   * @returns response
   */
  @Delete(':id/soft-delete')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'User ID',
    example: 1,
  })
  public softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'API no longer exists',
        param: id,
      },
      HttpStatus.MOVED_PERMANENTLY,
    );
  }
}
