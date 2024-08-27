import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Matches, MaxLength, MinLength } from 'class-validator';

/**
 * Data transfer object for creating a new user
 * @description Data transfer object for creating a new user
 * @class CreateUserDto
 * @export CreateUserDto
 * @example { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password123@', isAuth: false }
 * @property {string} firstName - User first name
 * @property {string} lastName - User last name
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {boolean} isAuth - User authentication status
 */
export class CreateUserDto {
  /**
   * User first name
   * @description User first name
   * @type {string}
   * @example John
   * @required true
   */
  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  readonly firstName: string;

  /**
   * User last name
   * @description User last name
   * @type {string}
   * @example Doe
   * @default null
   * @optional true
   */
  @ApiPropertyOptional({ description: 'User last name', example: 'Doe' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  /**
   * User email
   * @description User email
   * @type {string}
   * @example johndoe@example.com
   * @required true
   * @unique true
   */
  @ApiProperty({ description: 'User email', example: 'johndoe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  readonly email: string;

  /**
   * User password
   * @description User password
   * @type {string}
   * @example password123@
   * @required true
   */
  @ApiProperty({ description: 'User password', example: 'password123@' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  /**
   * User authentication status
   * @description User authentication status
   * @type {boolean}
   * @example false
   * @default false
   * @optional true
   */
  @ApiPropertyOptional({
    description: 'User authentication status',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isAuth?: boolean;
}
