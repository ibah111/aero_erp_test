import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FileUploadInput {
  @IsString()
  @ApiProperty()
  filename: string;

  @IsString()
  @ApiProperty()
  size: number;

  @IsString()
  @ApiProperty()
  mimeType: string;

  @IsString()
  @ApiProperty()
  extension: string;

  @IsNumber()
  r_user_id: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  buffer: Buffer;
}

export class FilePaginationInput {
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  page: number;
  @ApiProperty({
    default: 25,
  })
  @IsNumber()
  limit: number;
}
