import { Controller, Body, ParseIntPipe } from '@nestjs/common';
import { Post, Delete, Param } from '@nestjs/common';
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

  /**
   * Route for handling delete tag request
   * @param id
   * @example HTTP DELETE /tags
   * @returns response
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({ status: 201, description: 'Tag deleted successfully' })
  public async deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  /**
   * Route for handling delete tag request
   * @param id
   * @example HTTP DELETE /tags
   * @returns response
   */
  @Delete(':id/soft-delete')
  @ApiOperation({ summary: 'Soft delete a tag' })
  @ApiResponse({ status: 201, description: 'Tag soft-deleted successfully' })
  public async softDeleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
}
