import { Module } from '@nestjs/common';
import { DatabaseModule } from './Databases/Databases.module';

@Module({
  imports: [DatabaseModule],
})
export class ModuleOfModules {}
