import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from '../dtos/create-post.dto';
import { GetPostsQueryDto } from '../dtos/get-post-query.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Post } from '../entities/post.entity';

import { UsersService } from 'src/users/providers/users.service';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';

/**
 * Service responsible for managing posts
 */
@Injectable()
export class PostsService {
  /**
   * Constructor of Posts service
   * @description Injects UsersService, PostRepository and MetaOptionRepository
   * @param usersService
   * @param postsRepository
   * @param metaOptionRepository
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  /**
   * The method to create a new post in the database
   * @param createPostDto
   * @returns Post
   */
  public async create(createPostDto: CreatePostDto) {
    try {
      // Find author based on authorId from database
      const author = await this.usersService.findOneById(createPostDto.authorId); // prettier-ignore

      // Find tags
      const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

      // Create post
      const post = this.postsRepository.create({ ...createPostDto, author, tags }); // prettier-ignore

      // Return post
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to get all posts form the database
   * @param query GetPostsQueryDto for getting queries
   * @returns Post[]
   */
  public async findAll(query: GetPostsQueryDto) {
    const { page, limit } = query;

    let foundPosts: Post[] = [];

    try {
      const [posts] = await this.postsRepository.findAndCount({
        relations: { metaOptions: true, author: true, tags: true }, // ALTERNATIVE: to eager loading in entity
        skip: (page - 1) * limit,
        take: limit,
      });

      foundPosts = posts;
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!foundPosts) {
      throw new NotFoundException('Adjust page and limit query', {
        description: 'Posts not found',
      });
    }

    return foundPosts;
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
