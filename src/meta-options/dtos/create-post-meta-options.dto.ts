import { IsNotEmpty, IsJSON } from 'class-validator';

/**
 * Data transfer object (DTO) with metadata options for creating a post.
 * @description Data transfer object (DTO) with metadata options for creating a post.
 * @property {JSON} metaValue - Metadata value
 */
export class CreatePostMetaOptionsDto {
  /**
   * Metadata value
   * @example { "key": "value" }
   */
  @IsJSON()
  @IsNotEmpty()
  readonly metaValue: string;
}
