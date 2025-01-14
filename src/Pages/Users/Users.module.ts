import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/Modules/Databases/Sqlite.database/models/User';
import UsersController from './Users.controller';
import UsersService from './Users.service';

@Module({
  imports: [SequelizeModule.forFeature([Users], 'sqlite')],
  controllers: [UsersController],
  providers: [UsersService],
})
export default class UsersModule {}
