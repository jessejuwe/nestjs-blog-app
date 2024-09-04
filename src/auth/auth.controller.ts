import { Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';

import { createSuccessResponse } from 'src/common/response/util/success-response.util';

/**
 * Controller for auth
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Route for handling sign in request
   * @param signInDto An array of SignInDto used to validate incoming POST request
   * @example HTTP POST /sign-in
   * @returns response
   */
  @Auth(AuthType.None)
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiBody({
    required: true,
    type: SignInDto,
    description: 'User sign in details',
  })
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto) {
    const tokens = await this.authService.signIn(signInDto);
    return createSuccessResponse('User signed in successfully', true, tokens);
  }

  /**
   * Route for handling refresh tokens request
   * @param refreshTokenDto An array of RefreshTokenDto used to validate incoming POST request
   * @example HTTP POST /refresh-tokens
   * @returns response
   */
  @Auth(AuthType.None)
  @Post('refresh-tokens')
  @ApiOperation({ summary: 'Refresh user tokens' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiBody({
    required: true,
    type: SignInDto,
    description: 'Current refresh token',
  })
  @HttpCode(HttpStatus.OK) // changed since the default is 201
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshTokens(refreshTokenDto);
    return createSuccessResponse('Tokens refreshed successfully', true, tokens);
  }
}
