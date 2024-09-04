import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
/**
 * Guard for access token
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Method to check if access token is valid
   * @param context Context of request
   * @returns boolean
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract request from context
    const request = context.switchToHttp().getRequest();

    // Extract token from request header authorization
    const token = this.extractRequestFromHeader(request);

    // Validate token
    if (!token) {
      throw new UnauthorizedException('User has no valid access token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration); // prettier-ignore
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('Access token not verified');
    }

    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
