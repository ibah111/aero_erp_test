import {
  Body,
  Controller,
  Get,
  Headers,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UsersService from './Users.service';
import { FindUserInput } from './Users.input';
import { JwtAuthGuard } from 'src/Modules/Guards/Jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Users')
@Controller('Users')
@ApiBearerAuth('JWT')
export default class UsersController implements OnModuleInit {
  salt = process.env.SALT;
  JWT_SECRET = process.env.JWT_SECRET;
  REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
  constructor(
    private readonly service: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  onModuleInit() {
    /**
     * 
    console.log('salt'.yellow, '===', this.salt);
    console.log(
      'JWT_SECRET is'.yellow,
      this.JWT_SECRET ? 'loaded'.green : 'empty'.red,
    );
    console.log(
      'REFRESH_SECRET_KEY is'.yellow,
      this.REFRESH_SECRET_KEY ? 'loaded'.green : 'empty'.red,
    );
    */
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async info(@Headers() headers: any) {
    const token = headers.authorization.split(' ').pop();
    const jwt = this.jwtService.decode(token);
    const user_id = jwt.sub;
    return await this.service.info(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUsers')
  async getUsers() {
    return await this.service.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post('findUser')
  async findUser(@Body() body: FindUserInput) {
    return await this.service.findUser({
      ...body,
    });
  }
}
