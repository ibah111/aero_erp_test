import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { AuthLoginInput, AuthRefreshInput } from './Auth.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: AuthLoginInput) {
    return await this.authService.signup(body);
  }

  @Post('signin')
  async login(@Body() { login: username, password }: AuthLoginInput) {
    return this.authService
      .validateUser(username, password)
      .then((user) => this.authService.login(user));
  }

  @Post('signin/refresh_token')
  async refresh_token(@Body() { refresh_token }: AuthRefreshInput) {
    return this.authService.refresh(refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check_protected')
  protectedRoute(@Req() req: any) {
    return { message: 'You have access to this route', user: req.user };
  }
}
