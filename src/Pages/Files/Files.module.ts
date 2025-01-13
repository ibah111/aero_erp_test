import { Module } from '@nestjs/common';
import FileController from './File.controller';
import { FileServices } from './File.services';

@Module({
  controllers: [FileController],
  providers: [FileServices],
})
export default class FilesModule {}
