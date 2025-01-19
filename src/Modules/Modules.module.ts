import { Module } from '@nestjs/common';
import { DatabaseModule } from './Databases/Databases.module';
import { GuardsModule } from './Guards/Guards.module';
import { AuthModule } from './Auth/Auth.module';

@Module({
  imports: [DatabaseModule, GuardsModule, AuthModule],
})
export class ModuleOfModules {}
