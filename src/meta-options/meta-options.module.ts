import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetaOption } from './entities/meta-option.entity';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './providers/meta-options.service';

/**
 * Module for meta-options
 * @description Module for meta-options
 * @module MetaOptionsModule
 */
@Module({
  controllers: [MetaOptionsController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
})
export class MetaOptionsModule {}
