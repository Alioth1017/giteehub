import { Body, Get, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { CoolController, BaseController } from 'midwayjs-cool-core';

import { BasePluginInfoService } from '../../../service/plugin/info';

/**
 * 插件
 */
@Provide()
@CoolController(undefined, {
  tagName: 'Base-插件',
  description: '插件管理接口',
})
export class BasePluginInfoController extends BaseController {
  @Inject()
  basePluginInfoService: BasePluginInfoService;

  /**
   * 插件列表
   */
  @(CreateApiDoc()
    .summary('插件列表')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/list')
  async list(@Body() keyWord: string) {
    return this.ok(await this.basePluginInfoService.list(keyWord));
  }

  /**
   * 配置
   * @param namespace
   * @param config
   */
  @(CreateApiDoc()
    .summary('设置配置')
    .description('')
    .respond(1000, 'success', 'json', { example: {} })
    .build())
  @Post('/config')
  async config(@Body() namespace: string, @Body() config: any) {
    await this.basePluginInfoService.config(namespace, config);
    return this.ok();
  }

  /**
   * 配置
   * @param namespace
   * @param config
   */
  @(CreateApiDoc()
    .summary('读取配置')
    .description('')
    .respond(1000, 'success', 'json', { example: {} })
    .build())
  @Get('/getConfig')
  async getConfig(@Query() namespace: string) {
    return this.ok(await this.basePluginInfoService.getConfig(namespace));
  }

  /**
   * 启用插件
   * @param enable
   */
  @(CreateApiDoc()
    .summary('启用插件')
    .description('')
    .respond(1000, 'success', 'json', { example: {} })
    .build())
  @Post('/enable')
  async enable(@Body() namespace: string, @Body() enable: number) {
    await this.basePluginInfoService.enable(namespace, enable);
    return this.ok();
  }
}
