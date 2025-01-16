import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UsersService from './Users.service';

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
}
