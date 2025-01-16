import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { AuthLoginInput, AuthRefreshInput } from './Auth.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthLoginInput) {
    return this.authService
      .validateUser(username, password)
      .then((user) => this.authService.login(user));
  }

  @Post('refresh')
  async refresh(@Body() { refresh_token }: AuthRefreshInput) {
    return this.authService.refresh(refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  protectedRoute(@Req() req: any) {
    return { message: 'You have access to this route', user: req.user };
  }
}
