import { Controller, Get, Provide } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';

@Provide()
@Controller('/', {
  tagName: '默认的接口',
  description: '包含连通性接口、鉴权验证接口',
})
export class HomeController {
  @(CreateApiDoc().summary('获取主页').description('不需要鉴权').build())
  @Get('/')
  public async welcome(ctx: Context) {
    await ctx.render('welcome', {
      text: 'Hello Giteehub!',
    });
  }

  @(CreateApiDoc().summary('检查连通性').description('不需要鉴权').build())
  @Get('/ping')
  async ping(ctx: Context) {
    ctx.body = 'OK';
  }
}
