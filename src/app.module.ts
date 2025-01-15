import { Module } from '@nestjs/common';
import { ModuleOfModules } from './Modules/Modules.module';
import PagesModule from './Pages/Pages.module';

@Module({
  imports: [PagesModule, ModuleOfModules],
})
export class AppModule {}
