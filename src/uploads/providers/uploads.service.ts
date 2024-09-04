import { Injectable } from '@nestjs/common';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UploadToAwsProvider } from './upload-to-aws.provider';
import { Upload } from '../upload.entity';
import { FileTypes } from '../enums/file-types.enum';
import { UploadFile } from '../interfaces/upload-file.interface';

/**
 * Service for uploads
 */
@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
  ) {}

  /**
   * Upload a file
   * @param file - File to upload
   */
  public async uploadFile(file: Express.Multer.File) {
    const supportedMimeTypes = [
      'image/gif',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];

    // throw error for unsupported file types
    if (!supportedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('MIME type not supported');
    }

    try {
      // Upload file to AWS S3 bucket
      const name = await this.uploadToAwsProvider.fileupload(file);
      // Generate a new record in upload table
      const uploadFile: UploadFile = {
        name,
        path: `${this.configService.get<string>('appConfig.awsCloudFrontUrl')}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      // create an upload
      const upload = this.uploadsRepository.create(uploadFile);
      // save the details to database
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
