import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AccessTokenGuard } from '../access-token/access-token.guard';

import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  // prettier-ignore
  private readonly authTypeGuardmap: Record<AuthType, CanActivate | CanActivate[]> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get authTypes from reflector
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    // Map authTypes to guards
    const guards = authTypes.map((authType) => this.authTypeGuardmap[authType]).flat(); // prettier-ignore

    // Declare default error
    let error = new UnauthorizedException();

    // Loop through guards
    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        // Here the AccessToken Guard Will be fired and check if user has permissions to acces
        // Later Multiple AuthTypes can be used even if one of them returns true
        // The user is Authorised to access the resource
        guard.canActivate(context),
      ).catch((e) => {
        error = e;
      });

      if (canActivate) {
        return true;
      }
    }

    // Throw error if user is not authorised
    throw error;
  }
}
