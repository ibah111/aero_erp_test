import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/Pages/Users/Users.module';
import { JwtStrategy } from '../Strategy/Jwt.strategy';
import { AuthController } from './Auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../Databases/Sqlite.database/models/User';

@Module({
  imports: [
    SequelizeModule.forFeature([User], 'sqlite'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
