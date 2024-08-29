import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
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

  /**
   * The method to create find multiple tags in the database
   * @param tags
   * @returns Tag[]
   */
  public async findMultipleTags(tags: number[]) {
    let results = undefined;

    try {
      results = await this.tagsRepository.find({
        where: { id: In(tags) },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection error',
      });
    }

    if (!results) {
      throw new NotFoundException('Tags do not exist');
    }

    return results;
  }

  /**
   * The method to delete a tag in the database
   * @param id
   * @returns response
   */
  public async delete(id: number) {
    try {
      const tag = await this.tagsRepository.findOneBy({ id });

      if (!tag) {
        throw new NotFoundException('Tag does not exist.');
      }

      await this.tagsRepository.delete(id);
      return { deleted: true, id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * The method to soft delete a tag in the database
   * @param id
   * @returns response
   */
  public async softDelete(id: number) {
    try {
      const tag = await this.tagsRepository.findOneBy({ id });

      if (!tag) {
        throw new NotFoundException('Tag does not exist.');
      }

      await this.tagsRepository.softDelete(id);
      return { deleted: true, id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
