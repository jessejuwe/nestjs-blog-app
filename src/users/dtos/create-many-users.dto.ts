import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object for creating a new user
 * @class CreateManyUsersDto
 * @export CreateManyUsersDto
 * @example { users: [] }
 */
export class CreateManyUsersDto {
  /**
   * Array of Users
   * @type {array}
   * @example [User, User]
   * @required true
   */
  @ApiProperty({
    type: 'array',
    required: true,
    description: 'Array of Users',
    items: { type: 'User' },
    example: [CreateUserDto, CreateUserDto],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  readonly users: CreateUserDto[];
}
