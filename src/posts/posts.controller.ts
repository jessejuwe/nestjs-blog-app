import { Controller, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { Get, Patch, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostParamDto } from './dtos/get-post-param.dto';
import { GetPostsQueryDto } from './dtos/get-post-query.dto';
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
   * @example HTTP GET /posts?startDate=""&endDate=""&limit=10&page=1
   * @returns response
   */
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Post fetched successfully' })
  @ApiQuery({
    name: 'getPostsQueryDto',
    required: false,
    type: GetPostsQueryDto,
    description: 'Post Query DTO',
    example: { startDate: new Date(), endDate: new Date(), page: 1, limit: 10 },
  })
  public getPosts(@Query() postsQuery: GetPostsQueryDto) {
    return this.postsService.findAll(postsQuery);
  }

  /**
   * Route for handling get posts request
   * @example HTTP GET /posts/1
   * @returns Post
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, description: 'Post fetched successfully' })
  @ApiParam({
    name: 'getPostParamDto',
    required: true,
    type: GetPostParamDto,
    description: 'Post Param DTO',
    example: { id: 1 },
  })
  public getPost(@Param() getPostParamDto: GetPostParamDto) {
    return this.postsService.findOne(getPostParamDto.id);
  }

  /**
   * Route for handling get posts request
   * @example HTTP GET /user/posts/1
   * @returns Post[]
   */
  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get posts by userId' })
  @ApiResponse({ status: 200, description: 'Post fetched successfully' })
  public getUserPost(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAllByUserId(userId);
  }

  /**
   * Route for handling create post request
   * @param createPostDto
   * @example HTTP POST /posts
   * @returns Post
   */
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiBody({
    required: true,
    type: CreatePostDto,
    description: 'Create Post DTO',
  })
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
