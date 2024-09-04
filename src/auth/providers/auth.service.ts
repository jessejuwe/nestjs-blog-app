import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { RefreshTokensProvider } from './refresh-tokens.provider';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { SignInDto } from '../dtos/signin.dto';

import { UsersService } from 'src/users/providers/users.service';

/**
 * Service responsible for handling authentication
 */
@Injectable()
export class AuthService {
  /**
   * Constructor of Auth service
   * @description Injects UsersService
   */
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokenProvider: RefreshTokensProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public async validateUser(username: string, password: string): Promise<any> {
    if (username === 'john' && password === 'changeme') {
      return { id: 1, username: 'john' };
    }
    return null;
  }

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
