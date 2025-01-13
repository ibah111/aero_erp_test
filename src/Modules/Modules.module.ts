import { Module } from '@nestjs/common';
import MysqlDatabaseModule from './Database/Mysql.database';

@Module({
  imports: [MysqlDatabaseModule],
})
export class ModuleOfModules {}
