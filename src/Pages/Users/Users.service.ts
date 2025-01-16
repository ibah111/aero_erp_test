import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';
import * as bcrypt from 'bcryptjs';
import { FindUserInput, SignInput } from './Users.input';
import { Op } from 'sequelize';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User, 'sqlite') private readonly modelUsers: typeof User,
  ) {}
  REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
  async getUsers() {
    return await this.modelUsers.findAll();
  }

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
      const isMatch = await bcrypt.compare(input_password, hashed_pwd);
      if (user && isMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }

  async findUser({ id, username }: FindUserInput) {
    const user = await this.modelUsers.findOne({
      where: {
        [Op.or]: [
          {
            id,
          },
          {
            login: {
              [Op.like]: `%${username}%`,
            },
          },
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
