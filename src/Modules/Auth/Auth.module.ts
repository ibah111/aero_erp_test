import { Module } from '@nestjs/common';
import AuthService from './Auth.service';

@Module({
  providers: [AuthService],
})
export default class AuthModule {}
