import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostProvider } from './create-post.provider';
import { CreatePostDto } from '../dtos/create-post.dto';
import { GetPostsQueryDto } from '../dtos/get-post-query.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Post } from '../entities/post.entity';

import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

/**
 * Service responsible for managing posts
 */
@Injectable()
export class PostsService {
  /**
   * Constructor of Posts service
   * @description Injects UsersService, TagsService, PostRepository and PaginationProvider
   * @param usersService
   * @param postsRepository
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly createPostProvider: CreatePostProvider,
    private readonly paginationProvider: PaginationProvider,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * The method to create a new post in the database
   * @param createPostDto
   * @returns Post
   */
  public async create(createPostDto: CreatePostDto, user: IActiveUser) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  /**
   * The method to get all posts form the database
   * @param query GetPostsQueryDto for getting queries
   * @returns Post[]
   */
  public async findAll(query: GetPostsQueryDto): Promise<Paginated<Post>> {
    const { limit, page } = query;

    try {
      // prettier-ignore
      const posts = await this.paginationProvider.paginateQuery({ limit, page }, this.postsRepository);
      return posts;
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }

  /**
   * The method to get all posts form the database
   * @returns Post[]
   */
  public async findAllByUserId(userId: number) {
    const author = await this.usersService.findOneById(userId);

    let posts = undefined;

    try {
      posts = await this.postsRepository.find({
        where: { author },
        relations: { metaOptions: true, author: true, tags: true }, // ALTERNATIVE: to eager loading in entity
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!posts) {
      throw new NotFoundException('User does not exist');
    }

    return posts;
  }

  /**
   * The method to get a single post by ID
   * @param id number describing the post ID
   * @returns Post
   */
  public async findOne(id: number) {
    let post = undefined;

    try {
      post = await this.postsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!post) {
      throw new NotFoundException('Post id does not exist');
    }

    return post;
  }

  /**
   * The method to update a post in the database
   * @param patchPostDto A DTO used to validate args
   * @returns Post
   */
  public async update(patchPostDto: PatchPostDto) {
    // Find new tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    if (tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('Tags mismatch');
    }

    let post = undefined;

    try {
      // Find the post
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!post) {
      throw new BadRequestException('Post id does not exist');
    }

    // Update post related properties (Nullish coalescing operator)
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageURL = patchPostDto.featuredImageURL ?? post.featuredImageURL; // prettier-ignore
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Update the tags
    post.tags = tags;

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }

  /**
   * The method to remove a post from the database
   * @param id number describing the post ID
   * @returns object
   */
  public async delete(id: number) {
    try {
      // Delete the post
      await this.postsRepository.delete(id);

      // Return confirmation message
      return { deleted: true, id };
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }
  }
}
