import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from '../dtos/create-post.dto';
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
   * @returns Post[]
   */
  public async findAll(userId: number) {
    try {
      if (userId) {
        const author = await this.usersService.findOneById(userId);

        const posts = await this.postsRepository.find({
          where: { author },
          relations: { metaOptions: true, author: true, tags: true }, // ALTERNATIVE: to eager loading in entity
        });

        if (!posts) {
          throw new NotFoundException('No posts found');
        }

        return posts;
      } else {
        const posts = await this.postsRepository.find({
          relations: { metaOptions: true, author: true, tags: true }, // ALTERNATIVE: to eager loading in entity
        });

        if (!posts) {
          throw new NotFoundException('No posts found');
        }

        return posts;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to get a single post by ID
   * @param id
   * @returns Post
   */
  public async findOne(id: number) {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });

      if (!post) {
        throw new NotFoundException('No post found');
      }

      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to update a post in the database
   * @param patchPostDto
   * @returns any
   */
  public async update(patchPostDto: PatchPostDto) {
    try {
      // Find new tags
      const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

      // Find the post
      const post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      // Update post related properties
      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      post.status = patchPostDto.status ?? post.status;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.featuredImageURL = patchPostDto.featuredImageURL ?? post.featuredImageURL; // prettier-ignore
      post.publishOn = patchPostDto.publishOn ?? post.publishOn;

      // Update the tags
      post.tags = tags;

      return await this.postsRepository.save(post);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to remove a post from the database
   * @param id
   * @returns string
   */
  public async delete(id: number) {
    try {
      // Delete the post
      await this.postsRepository.delete(id);

      // Return confirmation message
      return { deleted: true, id };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
