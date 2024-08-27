import { Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

/**
 * Controller for meta-options
 * @description Controller for meta-options
 * @module MetaOptionsController
 */
@Controller('meta-options')
@ApiTags('Meta-Options')
export class MetaOptionsController {
  /**
   * Constructor for meta-options controller
   * @param {MetaOptionsService} metaOptionsService
   */
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  /**
   * Route for handling create postMetaOptions requests
   * @param createPostMetaOptionsDto
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new meta-option' })
  @ApiResponse({ status: 201, description: 'Meta-Option created successfully' })
  public createMetaOptions(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
