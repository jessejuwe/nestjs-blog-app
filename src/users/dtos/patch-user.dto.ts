import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

/**
 * Data transfer object (DTO) for updating a user.
 */
export class PatchUserDto extends PartialType(CreateUserDto) {}
