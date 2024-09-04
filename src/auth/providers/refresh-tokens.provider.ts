import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { GenerateTokensProvider } from './generate-tokens.provider';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { IActiveUser } from '../interfaces/active-user.interface';

import { UsersService } from 'src/users/providers/users.service';

/**
 * Provider to refresh tokens
 */
@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Refresh the access token and refresh token
   * @param refreshTokenDto - The refresh token DTO
   * @returns The new access token and refresh token
   */
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    // Verify the refresh token using jwtService
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      // Fetch the user from the database
      const user = await this.usersService.findOneById(sub);

      // Generate the tokens
      const tokens = await this.generateTokensProvider.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
