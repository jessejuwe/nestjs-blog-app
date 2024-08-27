import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/entities/post.entity';

/**
 * Module for users
 * @description Module for users
 * @module UsersModule
 */
@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Post]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
