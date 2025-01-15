import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from './File.services';
import { Express } from 'express';
import { FilePaginationInput, FileUploadInput } from './File.input';
import { Response } from 'express';

@ApiTags('File')
@Controller('File')
export default class FileController {
  constructor(private readonly fileService: FileService) {}

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
  @UseInterceptors(FileInterceptor('file', {}))
  @Post('upload')
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('r_user_id') r_user_id: number,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }
    const { filename, size, mimetype, originalname, buffer } = file;
    const extension = originalname.split('.').pop();
    const og = originalname.split('.').shift();
    return this.fileService
      .upload({
        filename: filename || og,
        size,
        mimeType: mimetype,
        extension,
        r_user_id,
        buffer,
      })
      .then(() => true)
      .catch(() => new Error(`Ошибка загрузки файла`));
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileService.download(Number(id));

    try {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${file.filename}"`,
      );
      res.setHeader('Content-Type', file.mimeType);
      res.send(file.buffer);
    } catch (error) {
      console.log('ERROR'.red, error);
      throw new HttpException(
        'Error downloading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getFile(@Param('id') id: number) {
    return await this.fileService.getFile(Number(id));
  }

  @Post('list')
  async getList(@Body() body: FilePaginationInput) {
    return await this.fileService.list({
      ...body,
    });
  }

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
  @UseInterceptors(FileInterceptor('file', {}))
  @Put('update/:id')
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('r_user_id') r_user_id: number,
  ) {
    const extension = file.originalname.split('.').pop();
    const og = file.originalname.split('.').shift();
    const body: FileUploadInput = {
      buffer: file.buffer,
      extension,
      filename: file.filename || og,
      mimeType: file.mimetype,
      r_user_id,
      size: file.size,
    };
    await this.fileService.update(body, r_user_id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.fileService.deleteFile(id);
  }
}
