import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { SqliteDatabaseSeed as SqliteSeed } from './Sqlite.seed';
import { models } from './models';

export const sqliteDatabaseConfig: SequelizeOptions = {
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false,
  models,
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
