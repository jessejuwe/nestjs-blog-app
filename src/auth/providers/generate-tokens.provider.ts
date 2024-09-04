import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import jwtConfig from '../config/jwt.config';
import { IActiveUser } from '../interfaces/active-user.interface';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      { sub: userId, ...payload },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IActiveUser>>(
        user.id,
        this.jwtConfiguration.accessTokenTTL,
        { email: user.email },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
    ]);
    return { accessToken, refreshToken };
  }
}
