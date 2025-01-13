import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('File')
export default class FileController {
  constructor() {}

  @Post()
  get() {
    const test = 'huh';
    console.log(test);
    return test;
  }
}
