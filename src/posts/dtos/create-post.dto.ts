import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsString } from 'class-validator';
import { IsUrl, IsISO8601, IsJSON } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Matches, MaxLength, MinLength } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dtos/create-post-meta-options.dto';
// import { CreateTagDto } from 'src/tags/dtos/create-tag.dto';

/**
 * Data transfer object (DTO) for creating a post.
 */
export class CreatePostDto {
  /**
   * Title of the post
   * @example New Post
   * @minLength 4
   * @maxLength 512
   */
  @ApiProperty({ type: 'string', required: true, example: 'New Post' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(512)
  readonly title: string;

  /**
   * Type of the post
   * @example Possible values - 'post', 'page', 'story', 'series'
   */
  @ApiProperty({
    type: 'enum',
    enum: PostType,
    required: true,
    description: "Possible values - 'post', 'page', 'story', 'series'",
    example: 'post',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  readonly postType: PostType;

  /**
   * Slug of the post
   * @description Slug of the post
   * @example my-post
   * @pattern ^[a-z0-9]+(?:-[a-z0-9]+)*$
   */
  @ApiProperty({ type: 'string', required: true, example: 'my-post' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  readonly slug: string;

  /**
   * Status of the post
   * @description Status of the post
   * @example Possible values - 'draft', 'scheduled', 'review', 'published'
   */
  @ApiProperty({
    type: 'enum',
    enum: PostStatus,
    required: true,
    description:
      "Possible values - 'draft', 'scheduled', 'review', 'published'",
    example: 'draft',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  readonly status: PostStatus;

  /**
   * Content of the post
   * @description Content of the post
   * @example This is the content of the post.
   * @optional true
   */
  @ApiPropertyOptional({
    type: 'string',
    required: false,
    example: 'This is the content of the post.',
  })
  @IsString()
  @IsOptional()
  readonly content?: string;

  /**
   * Schema of the post
   * @description Schema of the post
   * @example
   * {
   *   "@context": "https://schema.org",
   *   "@type": "Person"
   * }
   * @optional true
   */
  @ApiPropertyOptional({
    type: 'json',
    required: false,
    description: 'Serialize JSON object to avoid error',
    example:
      '{\r\n    "@context": "https://schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsJSON()
  @IsOptional()
  readonly schema?: string;

  /**
   * Featured image for post
   * @description Featured image for post
   * @example http://localhost.com/images/image1.jpg
   * @optional true
   */
  @ApiPropertyOptional({
    type: 'url',
    required: false,
    description: 'Featured image for post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  readonly featuredImageURL?: string;

  /**
   * Publish date of the post
   * @description Publish date of the post
   * @example 2024-03-16T07:46:32+0000
   */
  @ApiPropertyOptional({
    type: 'date',
    required: false,
    description: 'Must be a valid timestamp in ISO8601',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  readonly publishOn?: Date;

  /**
   * Tags for the post
   * @description Tags for the post
   * @example [1, 2]
   * @optional true
   */
  @ApiPropertyOptional({
    type: 'array',
    required: false,
    description: 'Array of tag ids',
    example: [1, 2],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  // @Type(() => CreateTagDto)
  readonly tags?: number[];

  /**
   * Meta options for the post
   * @description Meta options for the post
   * @example { "key": "sidebarEnabled", "value": true }
   * @optional true
   */
  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'a JSON string',
          example: '{ "sidebarEnabled": true }',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  readonly metaOptions?: CreatePostMetaOptionsDto | null;

  /**
   * ID of post author
   * @example 1
   */
  @ApiProperty({ type: 'integer', required: true, example: 1 })
  @IsInt()
  @IsNotEmpty()
  readonly authorId: number;
}
