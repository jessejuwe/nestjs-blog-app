import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Refresh token DTO class
 * @description Data transfer object for refreshing token
 */
export class RefreshTokenDto {
  /**
   * Token of the user
   * @example asaae4223e
   */
  @ApiProperty({
    type: String,
    required: true,
    example: 'asaae4223e',
    description: 'Refresh token of the user',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
