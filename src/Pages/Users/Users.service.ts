import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User, 'sqlite') private readonly modelUsers: typeof User,
  ) {}

  async getUsers() {
    return await this.modelUsers.findAll();
  }
}
