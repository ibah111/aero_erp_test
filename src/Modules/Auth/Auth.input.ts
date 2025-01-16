import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginInput {
  @ApiProperty({
    default: 'admin',
  })
  @IsString()
  username: string;
  @ApiProperty({
    default: 'password',
  })
  @IsString()
  password: string;
}

export class AuthRefreshInput {
  @ApiProperty({
    default: '',
  })
  refresh_token: string;
}
