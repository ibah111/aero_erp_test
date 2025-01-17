import { Module } from '@nestjs/common';
import TokenService from './Token.service';

@Module({
  exports: [TokenService],
  providers: [TokenService],
})
export default class TokenModule {}
