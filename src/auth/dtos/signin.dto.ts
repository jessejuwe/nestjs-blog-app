import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Signin DTO class
 * @description Data transfer object for signin
 */
export class SignInDto {
  /**
   * Email of the user
   * @example johndoe@example.com
   */
  @ApiProperty({
    type: String,
    required: true,
    example: 'johndoe@example.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Password of the user
   * @example password123@
   */
  @ApiProperty({
    type: String,
    required: true,
    example: 'password123@',
    description: 'Password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
