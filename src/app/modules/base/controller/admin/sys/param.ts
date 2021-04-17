import { Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { CoolController, BaseController } from 'midwayjs-cool-core';

import { BaseSysParamEntity } from '../../../entity/sys/param';
import { BaseSysParamService } from '../../../service/sys/param';

/**
 * 参数配置
 */
@Provide()
@CoolController(
  {
    api: ['add', 'delete', 'update', 'info', 'page'],
    entity: BaseSysParamEntity,
    pageQueryOp: {
      keyWordLikeFields: ['name', 'keyName'],
    },
  },
  {
    tagName: 'Base-系统-参数配置',
    description: '包含参数配置的增、删、改、查',
  }
)
export class BaseSysParamController extends BaseController {
  @Inject()
  baseSysParamService: BaseSysParamService;

  @Inject()
  ctx: Context;

  /**
   * 根据配置参数key获得网页内容(富文本)
   */
  @(CreateApiDoc()
    .summary('根据配置参数key获得网页内容(富文本)')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Get('/html')
  async htmlByKey(@Query() key: string) {
    this.ctx.body = await this.baseSysParamService.htmlByKey(key);
  }
}
