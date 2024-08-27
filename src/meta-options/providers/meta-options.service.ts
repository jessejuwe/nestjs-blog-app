import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { MetaOption } from '../entities/meta-option.entity';

/**
 * Service for meta-options
 * @description Service for meta-options
 * @module MetaOptionsService
 */
@Injectable()
export class MetaOptionsService {
  /**
   * Constructor for meta-options service
   * @description Injects MetaOptionRepository
   * @param metaOptionsRepository
   */
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  /**
   * The method to create a new meta option
   * @param createPostMetaOptionsDto
   * @returns Create
   */
  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    try {
      const metaOption = this.metaOptionsRepository.create(createPostMetaOptionsDto); // prettier-ignore
      return await this.metaOptionsRepository.save(metaOption);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
