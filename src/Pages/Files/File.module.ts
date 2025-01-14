import { Module } from '@nestjs/common';
import FileController from './File.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileService } from './File.services';
import { File } from 'src/Modules/Databases/Sqlite.database/models/File';

@Module({
  imports: [SequelizeModule.forFeature([File], 'sqlite')],
  controllers: [FileController],
  providers: [FileService],
})
export default class FilesModule {}
