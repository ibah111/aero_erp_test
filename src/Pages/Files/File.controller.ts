import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './File.services';
import { Express } from 'express';

@ApiTags('File')
@Controller('File')
export default class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async get() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('r_user_id') r_user_id: number,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }
    const fileDetails = {
      filename: file.originalname,
      extension: file.originalname.split('.').pop() || '',
      mimeType: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
    };
    await this.fileService.upload({
      ...fileDetails,
      r_user_id,
    });
  }
}
