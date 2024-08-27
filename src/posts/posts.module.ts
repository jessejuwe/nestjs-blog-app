import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { PostsService } from './providers/posts.service';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';

/**
 * Module for posts
 * @description Module for posts
 * @module PostsModule
 */
@Module({
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
