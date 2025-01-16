import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import UsersService from 'src/Pages/Users/Users.service';
import { User } from '../Databases/Sqlite.database/models/User';
import { AuthLoginInput } from './Auth.input';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User, 'sqlite') private readonly modelUser: typeof User,
  ) {}
  REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
  SALT = process.env.SALT;
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUser({
      username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signup({ login, password: plainPassword }: AuthLoginInput) {
    return await this.modelUser
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
          throw new Error('User with this login is already existed');

        const password = await bcrypt.hash(plainPassword, this.SALT);
        const user = await this.modelUser.create({
          login,
          password,
        });
        return user ? true : false;
      });
  }

  async login(user: User) {
    const payload = { username: user.login, sub: user.id };
    const refresh_token = this.generateRefreshToken(user.id);

    await this.usersService.updateRefreshToken(user.id, refresh_token);

    return {
      accessToken: this.jwtService.sign(payload),
      refresh_token,
    };
  }

  async refresh(refresh_token: string) {
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: this.REFRESH_SECRET_KEY,
      });
      const user = await this.usersService.findUser({
        id: decoded.sub,
      });

      if (user.refresh_token !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { username: user.login, sub: user.id };
      const newRefreshToken = this.generateRefreshToken(user.id);

      await this.usersService.updateRefreshToken(user.id, newRefreshToken);

      return {
        accessToken: this.jwtService.sign(newPayload),
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh token expired or invalid\n' + error,
      );
    }
  }

  private generateRefreshToken(user_id: number) {
    return this.jwtService.sign(
      { sub: user_id },
      { secret: this.REFRESH_SECRET_KEY, expiresIn: '7d' },
    );
  }
}
