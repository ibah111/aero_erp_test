import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './Jwt-auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import BlacklistTokens from '../Databases/Sqlite.database/models/BlacklistTokens';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([BlacklistTokens], 'sqlite'),
    ScheduleModule.forRoot(),
  ],
  providers: [JwtAuthGuard, JwtService],
})
export class GuardsModule {}
