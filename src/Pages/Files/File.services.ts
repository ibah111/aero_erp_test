import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File as FileModel } from 'src/Modules/Databases/Sqlite.database/models/File';
import { FileUploadInput } from './File.input';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel, 'sqlite')
    private readonly modelFile: typeof FileModel,
  ) {}

  async upload({ filename, size, mimeType, extension }: FileUploadInput) {
    try {
      await this.modelFile
        .create({
          filename,
          size,
          mimeType,
          extension,
        })
        .then((result) => {
          return {
            success: true,
            data: result,
          };
        });
    } catch (error) {
      console.log(`ERROR\n`.red, error);
    }
  }
}
