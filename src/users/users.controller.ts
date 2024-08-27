import { Controller, Param, Query } from '@nestjs/common';
import { Body, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

/**
 * Controller responsible for handling users data
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Route for handling get users request
   * @param getUsersParamDto
   * @param page
   * @param limit
   * @example HTTP GET /users
   * @returns response
   */
  @Get(':id?')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit',
    example: 10,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query() getUsersQueryDto: GetUsersQueryDto,
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const id = getUsersParamDto.id;
    const response = this.usersService.findAll(id, getUsersQueryDto);
    return response;
  }

  /**
   * Route for handling create user request
   * @example HTTP POST /user
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Route for handling patch user request
   * @param id
   * @param patchUserDto
   * @example HTTP PATCH /user
   * @returns response
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  public patchUser(
    @Param('id') id: number,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return patchUserDto;
  }

  /**
   * Route for handling delete user request
   * @param payload
   * @example HTTP DELETE /user
   * @returns response
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  public deleteUser(@Param('id') id: number, @Body() payload: any) {
    return payload;
  }
}
