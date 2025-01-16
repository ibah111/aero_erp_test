import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';
import { FindUserInput } from './Users.input';
import { Op } from 'sequelize';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User, 'sqlite') private readonly modelUsers: typeof User,
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
          .then(() => {
            console.log('refresh token updated');
            return 'refresh token updated';
          });
      }
    } catch (error) {
      throw new Error('Error updating refreshToken'.red + error);
    }
  }
}
