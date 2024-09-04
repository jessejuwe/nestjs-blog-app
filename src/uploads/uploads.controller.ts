import { Controller, Post } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { UploadsService } from './providers/uploads.service';

/**
 * Controller for uploads
 */
@Controller('uploads')
@ApiTags('Uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  /**
   * Upload a file
   * @param file - File to upload
   */
  @Post('file')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Token' },
  ])
  @ApiOperation({ summary: `Upload a new image to the server` })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadFile(file);
  }
}
