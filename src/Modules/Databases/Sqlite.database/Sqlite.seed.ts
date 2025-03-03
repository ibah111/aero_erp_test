import { InjectConnection } from '@nestjs/sequelize';
import { join } from 'path';
import createUmzug from '../umzug';
import { Sequelize } from 'sequelize-typescript';
import { OnModuleInit } from '@nestjs/common';

export class SqliteDatabaseSeed implements OnModuleInit {
  constructor(
    @InjectConnection('sqlite') private readonly sequelize: Sequelize,
  ) {}
  async onModuleInit() {
    const umzug = createUmzug(
      this.sequelize,
      join(__dirname, 'migrations'),
      'MigrationMeta',
    );
    try {
      await this.sequelize.authenticate();
      await umzug.up();
      await this.seed();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async seed() {
    /**
     * createUmzug - кастом функция, которая возвращает обращение/создание
     * файлов, __dirname указан в функции, как @params - расписал выше
     */
    const umzug = createUmzug(
      this.sequelize, // подключение
      join(__dirname, 'seeds'), // директория
      'SeedMeta', // название таблицы - как МетаМиграции
    );
    await umzug.up();
  }
}
