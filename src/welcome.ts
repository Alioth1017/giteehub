import { Controller, Get, Provide } from '@midwayjs/decorator';

/**
 * 欢迎界面
 */
@Provide()
@Controller('/')
export class HomeController {
  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }
}
