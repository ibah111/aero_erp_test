import { Module } from '@nestjs/common';
import { DatabaseModule } from './Databases/Databases.module';
import { GuardsModule } from './Guards/Guards.module';
import { AuthModule } from './Auth/Auth.module';
import TokenModule from './Token/Token.module';

@Module({
  imports: [DatabaseModule, GuardsModule, AuthModule, TokenModule],
})
export class ModuleOfModules {}
