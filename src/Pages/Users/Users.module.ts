import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/Modules/Databases/Sqlite.database/models/User';
import UsersController from './Users.controller';
import UsersService from './Users.service';
import { JwtModule } from '@nestjs/jwt';
import BlacklistTokens from 'src/Modules/Databases/Sqlite.database/models/BlacklistTokens';

@Module({
  imports: [
    SequelizeModule.forFeature([User, File, BlacklistTokens], 'sqlite'),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule {}
