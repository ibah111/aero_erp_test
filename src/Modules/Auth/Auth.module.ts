import { Module, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/Pages/Users/Users.module';
import { JwtStrategy } from '../Strategy/Jwt.strategy';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../Databases/Sqlite.database/models/User';
import { ConfigModule } from '@nestjs/config';
import { GuardsModule } from '../Guards/Guards.module';
import { JwtAuthGuard } from '../Guards/Jwt-auth.guard';
import BlacklistTokens from '../Databases/Sqlite.database/models/BlacklistTokens';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forFeature([User, BlacklistTokens], 'sqlite'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
    UsersModule,
    GuardsModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  onModuleInit() {}
}
