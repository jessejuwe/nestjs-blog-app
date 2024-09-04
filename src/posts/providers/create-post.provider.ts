import { Injectable } from '@nestjs/common';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../entities/post.entity';

import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * The method to create a new post in the database
   * @param createPostDto
   * @param user
   * @returns Post
   */
  public async create(createPostDto: CreatePostDto, user: IActiveUser) {
    try {
      // Find author based on authorId from database
      const author = await this.usersService.findOneById(user.sub);

      // Find tags
      const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

      // Create post
      const post = this.postsRepository.create({ ...createPostDto, author, tags }); // prettier-ignore

      try {
        // Return post
        return await this.postsRepository.save(post);
      } catch (error) {
        throw new ConflictException(error, {
          description: 'Ensure post slug is unique',
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
