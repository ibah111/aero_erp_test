import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';
import * as bcrypt from 'bcryptjs';
import { SignInput } from './Users.input';
import { Op } from 'sequelize';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User, 'sqlite') private readonly modelUsers: typeof User,
  ) {}

  async signUp(
    { login, password: plainPassword }: SignInput,
    salt_value: number,
  ) {
    return await this.modelUsers
      .findAll({
        attributes: ['login'],
        where: {
          login: {
            [Op.like]: `%${login.toLowerCase()}%`,
          },
        },
      })
      .then(async (result) => {
        if (result.length > 0)
          throw new Error('Пользователь с таким логином существует.');

        const password = await bcrypt.hash(plainPassword, salt_value);
        const user = await this.modelUsers.create({
          login,
          password,
        });
        return user ? true : false;
      });
  }

  async signIn({ login, password: input_password }: SignInput) {
    const user = await this.modelUsers.findOne({
      where: {
        login,
      },
    });
    if (!user) {
      const err = new InternalServerErrorException();
      err.message = 'Такого пользователя не существует';
      return err;
    } else {
      const hashed_pwd = user.password;
      const isMatch = bcrypt.compareSync(input_password, hashed_pwd);
      console.log('isMatch', isMatch);
      return isMatch;
    }
  }

  async getUsers() {
    return await this.modelUsers.findAll();
  }
}
