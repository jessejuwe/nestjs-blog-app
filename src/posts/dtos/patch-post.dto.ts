import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

/**
 * Data transfer object (DTO) for updating a post.
 */
export class PatchPostDto extends PartialType(CreatePostDto) {
  /**
   * ID of post that needs to be updated
   * @example 1
   */
  @ApiProperty({
    description: 'ID of post that needs to be updated',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
