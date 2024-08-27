import { Controller, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { Get, Patch, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostsService } from './providers/posts.service';

/**
 * Controller responsible for handling posts data
 */
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Route for handling get posts request
   * @example HTTP GET /posts
   * @example HTTP GET /posts/1
   * @returns response
   */
  @Get(':userId?')
  @ApiOperation({ summary: 'Get all user posts' })
  @ApiResponse({ status: 200, description: 'Post fetched successfully' })
  public getPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }

  /**
   * Route for handling create post request
   * @param createPostDto
   * @example HTTP POST /posts
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  /**
   * Route for handling update post request
   * @param patchPostDto
   * @example HTTP PATCH /posts/1
   * @returns response
   */
  @Patch()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  /**
   * Route for handling delete post request
   * @param id
   * @example HTTP DELETE /posts/1
   * @returns response
   */
  @Delete()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
