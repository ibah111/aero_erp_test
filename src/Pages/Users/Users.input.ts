import { ApiProperty } from '@nestjs/swagger';

export class FindUserInput {
  @ApiProperty({
    default: 0,
  })
  id?: number;
  @ApiProperty({
    default: '',
  })
  username?: string;
}
