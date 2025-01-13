import { Module } from '@nestjs/common';
import FilesModule from './Pages/Files/Files.module';
import { ModuleOfModules } from './Modules/Modules.module';

@Module({
  imports: [FilesModule, ModuleOfModules],
})
export class AppModule {}
