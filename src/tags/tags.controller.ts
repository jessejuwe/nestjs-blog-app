import { Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

/**
 * Controller for tags
 */
@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  /**
   * Route for handling create tag request
   * @param createTagDto
   * @example HTTP POST /tags
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({ status: 201, description: 'Tag created successfully' })
  public async createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
