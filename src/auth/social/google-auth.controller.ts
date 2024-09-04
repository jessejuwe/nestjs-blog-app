import { Controller, Body, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthService } from './providers/google-auth.service';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

/**
 * Controller for Google authentication
 */
@Auth(AuthType.None)
@Controller('auth/google-auth')
@ApiTags('Auth')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthService,
  ) {}

  /**
   * Route for handling Google authentication request
   * @param googleTokenDto An array of GoogleTokenDto used to validate incoming POST request
   * @example HTTP POST /auth/google-auth
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Google authenticate a user' })
  @ApiResponse({ status: 200, description: 'User authenticted successfully' })
  @ApiBody({
    required: true,
    type: GoogleTokenDto,
    description: 'Google token',
  })
  authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
