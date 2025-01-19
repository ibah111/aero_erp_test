import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import UsersService from 'src/Pages/Users/Users.service';
import { User } from '../Databases/Sqlite.database/models/User';
import { AuthLoginInput } from './Auth.input';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import generateDeviceId from 'src/Utils/generateDeviceId';
import { JwtAuthGuard } from '../Guards/Jwt-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
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

        const password = await bcrypt.hash(plainPassword, Number(this.SALT));
        const user = await this.modelUser.create({
          login,
          password,
        });
        return this.login(user, await generateDeviceId());
      });
  }

  async login(user: User, device_id: string) {
    const payload = { login: user.login, sub: user.id, device_id };
    const refresh_token = this.generateRefreshToken(user.id);
    try {
      await this.usersService.updateRefreshToken(user.id, refresh_token);
      const accessToken = this.jwtService.sign(payload);
      const obj = this.jwtService.decode(accessToken, {
        json: true,
      });
      const returnObj = {
        accessToken,
        refresh_token,
        device_id,
      };
      console.log(obj, returnObj);
      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout(token: string): Promise<void> {
    this.jwtAuthGuard.addToBlacklist(token);
  }

  async logoutAll() {}

  async refresh(refresh_token: string, headers: any) {
    const access_token = headers.authorization.split(' ').pop();
    const obj = this.jwtService.decode(access_token);
    const device_id = obj.device_id;
    try {
      const verify = this.jwtService.verify(refresh_token, {
        secret: this.REFRESH_SECRET_KEY,
      });
      const user = await this.usersService.findUser({
        id: verify.sub,
      });

      if (user.refresh_token !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { username: user.login, sub: user.id, device_id };
      const newRefreshToken = this.generateRefreshToken(user.id);

      const accessToken = this.jwtService.sign(newPayload);
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh token expired or invalid\n' + error,
      );
    }
  }

  private generateRefreshToken(user_id: number) {
    try {
      return this.jwtService.sign(
        { sub: user_id },
        { secret: this.REFRESH_SECRET_KEY, expiresIn: '7d' },
      );
    } catch (error) {
      throw new Error('generateRefreshToken\n'.red + error);
    }
  }
}
