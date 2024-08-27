import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsString, IsUrl } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Matches, MaxLength, MinLength } from 'class-validator';

/**
 * Data transfer object (DTO) for creating a tag.
 */
export class CreateTagDto {
  /**
   * Name of tag
   * @description Name of tag
   * @example nestjs
   * @minLength 3
   * @maxLength 256
   */
  @ApiProperty({ description: 'Name of tag', example: 'nestjs' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  readonly name: string;

  /**
   * Slug of tag
   * @description Slug of tag
   * @example my-tag
   * @pattern ^[a-z0-9]+(?:-[a-z0-9]+)*$
   */
  @ApiProperty({ description: 'Slug of tag', example: 'my-tag' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  /**
   * Description of tag
   * @description Description of tag
   * @example This is a tag.
   */
  @ApiPropertyOptional({
    description: 'Description of tag',
    example: 'This is a tag.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Schema of tag
   * @description Schema of tag
   * @example { "key": "value" }
   */
  @ApiPropertyOptional({
    description: 'Schema of tag',
    example: '{ "key": "value" }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  /**
   * Featured image URL of tag
   * @description Featured image URL of tag
   * @example https://example.com/image.jpg
   */
  @ApiPropertyOptional({
    description: 'Featured image URL of tag',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageURL?: string;
}
