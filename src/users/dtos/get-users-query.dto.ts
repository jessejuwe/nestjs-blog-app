import { IsOptional, IsInt } from 'class-validator';
import { Type, Transform } from 'class-transformer';

/**
 * DTO for querying users.
 */
export class GetUsersQueryDto {
  /**
   * The page number.
   */
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 1)
  page?: number = 1;

  /**
   * The maximum number of items per page.
   */
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 10)
  limit?: number = 10;

  /**
   * The total number of pages.
   */
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 1)
  pages?: number = 1;

  /**
   * The total number of items.
   */
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? 0)
  total?: number = 0;
}
