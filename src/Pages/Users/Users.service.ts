import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';
import { FindUserInput } from './Users.input';
import { Op } from 'sequelize';
import { File as FileModel } from 'src/Modules/Databases/Sqlite.database/models/File';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User, 'sqlite') private readonly modelUsers: typeof User,
    @InjectModel(File, 'sqlite') private readonly modelFile: typeof File,
  ) {}
  async getUsers() {
    return await this.modelUsers.findAll();
  }

  async findUser({ id, username }: FindUserInput) {
    const user = await this.modelUsers.findOne({
      where: {
        [Op.or]: [
          id
            ? {
                id,
              }
            : {},
          username
            ? {
                login: {
                  [Op.like]: `%${username}%`,
                },
              }
            : {},
        ],
      },
    });
    return user;
  }

  async updateRefreshToken(user_id: number, refresh_token: string) {
    try {
      const user = await this.findUser({
        id: user_id,
      });
      if (user) {
        return user
          .update({
            refresh_token,
          })
          .then((res) => {
            console.log('Refresh token updated'.green);
            return res.refresh_token;
          });
      }
    } catch (error) {
      throw new Error('Error updating refreshToken'.red + error);
    }
  }

  async info(id: number) {
    return await this.modelUsers.findOne({
      where: {
        id,
      },
      include: [
        {
          model: FileModel,
          attributes: ['id', 'filename', 'extension', 'mimeType', 'size'],
        },
      ],
    });
  }
}
