import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { AuthLoginInput, AuthRefreshInput } from './Auth.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import generateDeviceId from 'src/Utils/generateDeviceId';

@ApiTags('Auth')
@ApiBearerAuth('JWT')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: AuthLoginInput) {
    return await this.authService.signup(body);
  }

  @Post('signin')
  async login(@Body() { login: username, password }: AuthLoginInput, @Headers('device_id') device_id?: string) {
    
    if (!device_id) {
      device_id = await generateDeviceId() 
    } 
    return this.authService
      .validateUser(username, password)
      .then((user) => this.authService.login(user, device_id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Headers() headers: any) {
    console.log(headers);
    const token = headers.authorization.split(' ').pop();
    const device 
    await this.authService.logout(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  async logoutAll() {
    await this.
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
