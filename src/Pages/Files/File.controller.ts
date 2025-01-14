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
  @FastifyFileInterceptor('file', {})
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('r_user_id') r_user_id: number,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const filename = file.originalname;
    const extension = file.originalname.split('.').pop() || '';
    const mimeType = file.mimetype;
    const size = file.size;
    const buffer = file.buffer;
    await this.fileService.upload({
      filename,
      extension,
      mimeType,
      size,
      r_user_id,
      buffer,
    });
  }
}
