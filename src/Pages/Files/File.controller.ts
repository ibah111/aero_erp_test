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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from './File.services';
import { Express } from 'express';

@ApiTags('File')
@Controller('File')
export default class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async get() {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {}))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('r_user_id') r_user_id: number,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }
    console.log(file);
    const { filename, size, mimetype, originalname, buffer } = file;
    const extension = originalname.split('.').pop();
    const og = originalname.split('.').shift();
    return this.fileService.upload({
      filename: filename || og,
      size,
      mimeType: mimetype,
      extension,
      r_user_id,
      buffer,
    });
  }
}
