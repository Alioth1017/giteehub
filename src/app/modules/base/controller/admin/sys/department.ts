import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { CoolController, BaseController } from 'midwayjs-cool-core';

import { BaseSysDepartmentEntity } from '../../../entity/sys/department';
import { BaseSysDepartmentService } from '../../../service/sys/department';

/**
 * 部门
 */
@Provide()
@CoolController(
  {
    api: ['add', 'delete', 'update', 'list'],
    entity: BaseSysDepartmentEntity,
    service: BaseSysDepartmentService,
  },
  {
    tagName: 'Base-系统-部门',
    description: '包含部门的增、删、改、查',
  }
)
export class BaseDepartmentController extends BaseController {
  @Inject()
  baseDepartmentService: BaseSysDepartmentService;

  /**
   * 部门排序
   */
  @(CreateApiDoc()
    .summary('部门排序')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/order')
  async order(@Body(ALL) params: any) {
    await this.baseDepartmentService.order(params);
    return this.ok();
  }
}
