import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { IActiveUser } from '../interfaces/active-user.interface';

/**
 * Active user decorator
 */
export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
