import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/entities/post.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import profileConfig from './config/profile.config';

/**
 * Module for users
 * @description Module for users
 * @module UsersModule
 */
@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Post]),
    ConfigModule.forFeature(profileConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider],
  exports: [UsersService],
})
export class UsersModule {}
