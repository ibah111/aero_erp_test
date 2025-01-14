import { Module } from '@nestjs/common';
import FileController from './File.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileService } from './File.services';

@Module({
  imports: [SequelizeModule.forFeature([File], 'sqlite')],
  controllers: [FileController],
  providers: [FileService],
})
export default class FilesModule {}
