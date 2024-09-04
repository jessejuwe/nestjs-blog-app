import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

/**
 * Data transfer object (DTO) for updating a user.
 */
export class PatchUserDto extends PartialType(CreateUserDto) {
  /**
   * The ID of the user.
   * @example 1
   */
  @ApiProperty({
    type: 'number',
    required: true,
    readOnly: true,
    format: 'number',
    description: 'The ID of the user',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
