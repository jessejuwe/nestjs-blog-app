import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

/**
 * DTO for getting post
 */
export class GetPostParamDto {
  /**
   * Post ID
   * @example 1
   */
  @ApiPropertyOptional({ description: 'Post ID', example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly id?: number;
}
