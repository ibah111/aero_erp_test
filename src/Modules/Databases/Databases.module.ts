import { Module } from '@nestjs/common';
import { SqliteDatabaseModule } from './Sqlite.database/Sqlite.module';

@Module({
  imports: [SqliteDatabaseModule],
})
export class DatabaseModule {}
