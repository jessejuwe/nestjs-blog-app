import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for Google token
 */

export class GoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
