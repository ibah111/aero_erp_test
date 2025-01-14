import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UsersService from './Users.service';

@ApiTags('Users')
@Controller('Users')
export default class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('getUsers')
  async getUsers() {
    return await this.service.getUsers();
  }
}
