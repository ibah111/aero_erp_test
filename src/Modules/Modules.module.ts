import { Module } from '@nestjs/common';
import { DatabaseModule } from './Databases/Databases.module';
import AuthModule from './Auth/Auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
})
export class ModuleOfModules {}
