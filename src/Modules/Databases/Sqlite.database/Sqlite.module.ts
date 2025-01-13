import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { SqliteDatabaseSeed as SqliteSeed } from './Sqlite.seed';

export const sqliteDatabaseConfig: SequelizeOptions = {
  dialect: 'sqlite',
  storage: 'database.sqlite',
  models: [__dirname + '/../models/**/*.model.{js,ts}'],
};

@Module({
  providers: [SqliteSeed],
  imports: [
    SequelizeModule.forRootAsync({
      name: 'sqlite',
      useFactory: () => sqliteDatabaseConfig,
    }),
  ],
})
export class SqliteDatabaseModule {}
