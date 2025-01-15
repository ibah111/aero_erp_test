import { Module } from '@nestjs/common';
import { ModuleOfModules } from './Modules/Modules.module';
import PagesModule from './Pages/Pages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PagesModule,
    ModuleOfModules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
