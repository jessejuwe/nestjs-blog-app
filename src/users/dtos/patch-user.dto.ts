import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

/**
 * DTO for patching user
 * @description DTO for patching user
 */
export class PatchUserDto extends PartialType(CreateUserDto) {}
