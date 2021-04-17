import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';

import { BaseSysMenuEntity } from '../../../entity/sys/menu';
import { BaseSysMenuService } from '../../../service/sys/menu';

/**
 * 菜单
 */
@Provide()
@CoolController(
  {
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: BaseSysMenuEntity,
    service: BaseSysMenuService,
  },
  {
    tagName: 'Base-系统-菜单',
    description: '包含菜单的增、删、改、查',
  }
)
export class BaseSysMenuController extends BaseController {
  @Inject()
  baseSysMenuService: BaseSysMenuService;
}
