import { Module } from '@nestjs/common';
import UsersModule from './Users/Users.module';
import FilesModule from './Files/Files.module';

@Module({
  imports: [UsersModule, FilesModule],
})
export default class PagesModule {}
