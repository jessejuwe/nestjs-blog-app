import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/users/providers/users.service';

/**
 * Service responsible for handling authentication
 */
@Injectable()
export class AuthService {
  /**
   * Constructor of Auth service
   * @description Injects UsersService
   * @param usersService
   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public async validateUser(username: string, password: string): Promise<any> {
    if (username === 'john' && password === 'changeme') {
      return { id: 1, username: 'john' };
    }
    return null;
  }

  public async login(user: any) {
    try {
      const foundUser = this.usersService.findAll(user?.id);

      return { data: foundUser, token: 'SAMPLE_TOKEN' };
    } catch (error) {
      throw new BadRequestException('Login credentials are incorrect');
    }
  }

  public async isAuth(userId: number) {
    try {
      const user = await this.usersService.findOneById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isAuth = user.isAuth;
      return isAuth;
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }
}
