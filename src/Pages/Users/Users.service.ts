import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/Modules/Databases/Sqlite.database/models/User';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(Users, 'sqlite') private readonly modelUsers: typeof Users,
  ) {}

  async getUsers() {
    return await this.modelUsers.findAll();
  }
}
