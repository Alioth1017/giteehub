import {
  Provide,
  Body,
  ALL,
  Inject,
  Post,
  Get,
  Query,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { CoolController, BaseController } from 'midwayjs-cool-core';

import { LoginDTO } from '../../dto/login';
import { BaseSysLoginService } from '../../service/sys/login';
import { BaseSysParamService } from '../../service/sys/param';

/**
 * 不需要登录的后台接口
 */
@Provide()
@CoolController(undefined, {
  tagName: 'Base-不需要登录的后台接口',
  description: '',
})
export class BaseOpenController extends BaseController {
  @Inject()
  baseSysLoginService: BaseSysLoginService;

  @Inject()
  baseSysParamService: BaseSysParamService;

  @Inject()
  ctx: Context;

  /**
   * 根据配置参数key获得网页内容(富文本)
   */
  @Get('/html')
  async htmlByKey(@Query() key: string) {
    this.ctx.body = await this.baseSysParamService.htmlByKey(key);
  }

  /**
   * 登录
   * @param login
   */
  @(CreateApiDoc()
    .summary('登录')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/login')
  async login(@Body(ALL) login: LoginDTO) {
    return this.ok(await this.baseSysLoginService.login(login));
  }

  /**
   * 获得验证码
   */
  @(CreateApiDoc()
    .summary('获得验证码')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Get('/captcha')
  async captcha(
    @Query() type: string,
    @Query() width: number,
    @Query() height: number,
    @Query() background: string
  ) {
    return this.ok(
      await this.baseSysLoginService.captcha(type, width, height, background)
    );
  }

  /**
   * 刷新token
   */
  @(CreateApiDoc()
    .summary('刷新token')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Get('/refreshToken')
  async refreshToken(@Query() refreshToken: string) {
    return this.ok(await this.baseSysLoginService.refreshToken(refreshToken));
  }
}
