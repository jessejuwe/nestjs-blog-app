import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

/**
 * Main module of the application
 * @description Main module of the application
 * @module AppModule
 */
@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '$@admin@$',
        database: 'nestjs-blog',
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
