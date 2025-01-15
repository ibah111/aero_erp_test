import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File as FileModel } from 'src/Modules/Databases/Sqlite.database/models/File';
import { FilePaginationInput, FileUploadInput } from './File.input';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel, 'sqlite')
    private readonly modelFile: typeof FileModel,
    @InjectModel(User, 'sqlite')
    private readonly modelUser: typeof User,
  ) {}

  async upload({
    filename,
    size,
    mimeType,
    extension,
    buffer,
    r_user_id,
  }: FileUploadInput) {
    const body = {
      filename,
      size,
      mimeType,
      extension,
      buffer,
      r_user_id,
    };
    try {
      await this.modelFile
        .create({
          ...body,
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

  async download(id: number) {
    const file = await this.modelFile.findOne({
      where: {
        id,
      },
    });
    return file;
  }

  async deleteFile(id: number) {
    return await this.modelFile
      .destroy({
        where: {
          id,
        },
      })
      .then(() => true)
      .catch(
        (error) =>
          new Error('Файл не был удалён. Что-то пошло не так.\n' + error),
      );
  }

  async getFile(id: number) {
    const file = await this.modelFile.findOne({
      where: {
        id,
      },
    });
    if (file) {
      return file;
    }

    throw new Error('Файл не найден');
  }

  async list({ limit, page }: FilePaginationInput) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.modelFile.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'filename',
        'extension',
        'mimeType',
        'size',
        'r_user_id',
      ],
      include: [
        {
          model: User,
        },
      ],
    });
    return {
      rows,
      count,
    };
  }

  async update(body: FileUploadInput, id: number) {
    const file = await this.modelFile.findOne({
      where: {
        id,
      },
    });
    return await file
      .update({
        updatedAt: new Date(),
        ...body,
      })
      .catch(
        (error) =>
          new Error('При попытке обновить файл произошла ошибка\n'.red + error),
      );
  }
}
