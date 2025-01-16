import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UsersService from './Users.service';
import { SignInput } from './Users.input';

@ApiTags('Users')
@Controller('Users')
export default class UsersController implements OnModuleInit {
  salt_value = process.env.SALT;
  constructor(private readonly service: UsersService) {}
  onModuleInit() {
    console.log('salt'.yellow, this.salt_value);
  }

  @Get('getUsers')
  async getUsers() {
    return await this.service.getUsers();
  }

  @Post('signUp')
  async signUp(@Body() body: SignInput) {
    return await this.service.signUp(body, Number(this.salt_value));
  }

  @Post('signIn')
  async signIn(@Body() body: SignInput) {
    return await this.service.signIn({
      ...body,
    });
  }
}
