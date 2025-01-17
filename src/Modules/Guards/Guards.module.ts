import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './Jwt-auth.guard';

@Module({
  providers: [JwtAuthGuard],
})
export class GuardsModule {}
