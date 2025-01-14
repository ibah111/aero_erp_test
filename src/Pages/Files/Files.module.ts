import { Module } from '@nestjs/common';
import FileController from './File.controller';
import { FileServices } from './File.services';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([File], 'sqlite')],
  controllers: [FileController],
  providers: [FileServices],
})
export default class FilesModule {}
