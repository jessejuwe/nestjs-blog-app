import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './providers/tags.service';

/**
 * Module for tags
 * @description Module for tags
 * @module TagsModule
 */
@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
