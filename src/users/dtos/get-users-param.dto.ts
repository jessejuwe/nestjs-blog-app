import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

/**
 * DTO for getting users
 */
export class GetUsersParamDto {
  /**
   * User ID
   * @example 1
   */
  @ApiPropertyOptional({ description: 'User ID', example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly id?: number;
}
