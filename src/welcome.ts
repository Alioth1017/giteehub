import { Controller, Get, Provide, Plugin } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import type { Koid } from 'egg-koid';

@Provide()
@Controller('/', {
  tagName: '默认的接口',
  description: '包含连通性接口、鉴权验证接口',
})
export class HomeController {
  @Plugin()
  koid: Koid;

  @(CreateApiDoc().summary('获取主页').description('不需要鉴权').build())
  @Get('/')
  public async welcome(ctx: Context) {
    await ctx.render('welcome', {
      text: `Hello Giteehub!  ${ctx.reqId}`,
    });
  }

  @(CreateApiDoc().summary('检查连通性').description('不需要鉴权').build())
  @Get('/ping')
  async ping(ctx: Context) {
    ctx.body = 'OK';
  }

  @(CreateApiDoc()
    .summary('生成雪花ID，输出bigint')
    .description('不需要鉴权')
    .build())
  @Get('/genid')
  genId(): string {
    return this.koid.nextBigint.toString();
  }

  @(CreateApiDoc()
    .summary('生成雪花ID，输出HEX')
    .description('不需要鉴权')
    .build())
  @Get('/genidHex')
  genIdHex(): string {
    return this.koid.next.toString('hex');
  }
}
