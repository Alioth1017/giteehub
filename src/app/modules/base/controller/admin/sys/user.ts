import { Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { CoolController, BaseController } from 'midwayjs-cool-core';

import { BaseSysUserEntity } from '../../../entity/sys/user';
import { BaseSysUserService } from '../../../service/sys/user';

/**
 * 系统用户
 */
@Provide()
@CoolController(
  {
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: BaseSysUserEntity,
    service: BaseSysUserService,
  },
  {
    tagName: 'Base-系统-系统用户',
    description: '包含系统用户的增、删、改、查',
  }
)
export class BaseSysUserController extends BaseController {
  @Inject()
  baseSysUserService: BaseSysUserService;

  /**
   * 移动部门
   */
  @(CreateApiDoc()
    .summary('移动部门')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/move')
  async move(@Body() departmentId: number, @Body() userIds: []) {
    await this.baseSysUserService.move(departmentId, userIds);
    return this.ok();
  }
}
