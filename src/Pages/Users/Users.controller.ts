import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UsersService from './Users.service';
import { FindUserInput } from './Users.input';

@ApiTags('Users')
@Controller('Users')
export default class UsersController implements OnModuleInit {
  salt = process.env.SALT;
  JWT_SECRET = process.env.JWT_SECRET;
  REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
  constructor(private readonly service: UsersService) {}
  onModuleInit() {
    console.log('salt'.yellow, '===', this.salt);
    console.log(
      'JWT_SECRET is'.yellow,
      this.JWT_SECRET ? 'loaded'.green : 'empty'.red,
    );
    console.log(
      'REFRESH_SECRET_KEY is'.yellow,
      this.REFRESH_SECRET_KEY ? 'loaded'.green : 'empty'.red,
    );
  }

  @Get('getUsers')
  async getUsers() {
    return await this.service.getUsers();
  }

  @Post('findUser')
  async findUser(@Body() body: FindUserInput) {
    return await this.service.findUser({
      ...body,
    });
  }
}
