import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import profileConfig from './config/profile.config';
import { User } from './entities/user.entity';
import { UsersService } from './providers/users.service';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { UpdateUserProvider } from './providers/update-user.provider';

import { AuthModule } from 'src/auth/auth.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
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
    ConfigModule.forFeature(profileConfig),
    PaginationModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    UpdateUserProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
