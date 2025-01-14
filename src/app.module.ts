import { Module } from '@nestjs/common';
import { ModuleOfModules } from './Modules/Modules.module';
import { JwtModule } from '@nestjs/jwt';
import PagesModule from './Pages/Pages.module';

@Module({
  imports: [
    PagesModule,
    ModuleOfModules,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: {
        expiresIn: '10m',
      },
    }),
  ],
})
export class AppModule {}
