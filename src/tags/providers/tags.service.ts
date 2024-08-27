import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../tag.entity';

/**
 * Service responsible for managing tags
 */
@Injectable()
export class TagsService {
  /**
   * Constructor of Tags Service
   * @description Injects tagsRepository
   * @param tagRepository
   */
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * The method to create a new tag in the database
   * @param createTagDto
   * @returns Post
   */
  public async create(createTagDto: CreateTagDto) {
    try {
      const tag = this.tagsRepository.create(createTagDto);
      return await this.tagsRepository.save(tag);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findMultipleTags(tags: number[]) {
    try {
      const results = await this.tagsRepository.find({
        where: { id: In(tags) },
      });

      if (!results) {
        throw new NotFoundException('Tags not found.');
      }

      return results;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
