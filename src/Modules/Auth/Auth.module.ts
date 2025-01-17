import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/Pages/Users/Users.module';
import { JwtStrategy } from '../Strategy/Jwt.strategy';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../Databases/Sqlite.database/models/User';
import { ConfigModule } from '@nestjs/config';
import TokenModule from '../Token/Token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forFeature([User], 'sqlite'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    UsersModule,
    TokenModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  onModuleInit() {
    console.log(process.env.JWT_SECRET);
  }
}
