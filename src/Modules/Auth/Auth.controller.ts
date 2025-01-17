import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService } from './Auth.service';
import { JwtAuthGuard } from '../Guards/Jwt-auth.guard';
import { AuthLoginInput, AuthRefreshInput } from './Auth.input';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
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

  @ApiHeader({
    name: 'device_id',
    required: false,
  })
  @Post('signin')
  async login(
    @Body() { login: username, password }: AuthLoginInput,
    @Headers('device_id') device_id?: string,
  ) {
    if (!device_id) {
      device_id = await generateDeviceId();
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

    await this.authService.logout(token);
  }

  @ApiHeader({
    name: 'device_id',
    required: true,
  })
  @Post('signin/refresh_token')
  async refresh_token(
    @Body() { refresh_token }: AuthRefreshInput,
    @Headers('device_id') device_id: string,
  ) {
    return this.authService.refresh(refresh_token, device_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check_protected')
  protectedRoute(@Req() req: any) {
    return { message: 'You have access to this route', user: req.user };
  }
}
