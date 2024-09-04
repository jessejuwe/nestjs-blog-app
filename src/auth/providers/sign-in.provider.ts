import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';

import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/signin.dto';

import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly hashingProvider: HashingProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find user by email
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare password hash
    let isMatch: boolean = false;

    try {
      // prettier-ignore
      isMatch = await this.hashingProvider.comparePassword(signInDto.password, user.password);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Failed to compare passowrd',
      });
    }

    if (!isMatch) {
      throw new UnauthorizedException('Incorect password');
    }

    // Generate access token and refresh token
    const tokens = await this.generateTokensProvider.generateTokens(user);

    return tokens;
  }
}
