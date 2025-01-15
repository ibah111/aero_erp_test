import { ApiProperty } from '@nestjs/swagger';

export class SignInput {
  @ApiProperty({
    default: 'admin',
  })
  login: string;
  @ApiProperty({
    default: 'password',
  })
  password: string;
}
