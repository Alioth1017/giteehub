import { Controller, Get, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Controller('/', {
  tagName: '默认的接口',
  description: '包含连通性接口、鉴权验证接口',
})
export class HomeController {
  @Get('/')
  public async welcome(ctx: Context) {
    await ctx.render('welcome', {
      text: 'Hello Giteehub!',
    });
  }

  @Get('/ping')
  async ping(ctx: Context) {
    ctx.body = 'OK';
  }
}
