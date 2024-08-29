import { IsOptional, IsISO8601 } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * DTO for querying posts.
 */
class GetPostsBaseDto {
  /**
   * The start date query
   */
  @IsISO8601()
  @IsOptional()
  startDate?: Date;

  /**
   * The end date query
   */
  @IsISO8601()
  @IsOptional()
  endDate?: Date;
}

export class GetPostsQueryDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
