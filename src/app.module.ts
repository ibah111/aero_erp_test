import { Module } from '@nestjs/common';
import FilesModule from './Pages/Files/Files.module';
import { ModuleOfModules } from './Modules/Modules.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    FilesModule,
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
