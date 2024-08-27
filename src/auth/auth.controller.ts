import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './providers/auth.service';

/**
 * Controller for auth
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
