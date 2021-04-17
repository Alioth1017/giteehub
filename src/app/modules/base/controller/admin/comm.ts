import { Provide, Inject, Get, Post, Body, ALL } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { CoolController, BaseController, ICoolFile } from 'midwayjs-cool-core';

import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysLoginService } from '../../service/sys/login';
import { BaseSysPermsService } from '../../service/sys/perms';
import { BaseSysUserService } from '../../service/sys/user';

/**
 * Base 通用接口 一般写不需要权限过滤的接口
 */
@Provide()
@CoolController(undefined, {
  tagName: 'Base-通用接口',
  description: '一般写不需要权限过滤的接口',
})
export class BaseCommController extends BaseController {
  @Inject()
  baseSysUserService: BaseSysUserService;

  @Inject()
  baseSysPermsService: BaseSysPermsService;

  @Inject()
  baseSysLoginService: BaseSysLoginService;

  @Inject()
  ctx: Context;

  @Inject('cool:file')
  coolFile: ICoolFile;

  /**
   * 获得个人信息
   */
  @(CreateApiDoc()
    .summary('获得个人信息')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Get('/person')
  async person() {
    return this.ok(await this.baseSysUserService.person());
  }

  /**
   * 修改个人信息
   */
  @(CreateApiDoc()
    .summary('修改个人信息')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/personUpdate')
  async personUpdate(@Body(ALL) user: BaseSysUserEntity) {
    await this.baseSysUserService.personUpdate(user);
    return this.ok();
  }

  /**
   * 权限菜单
   */
  @(CreateApiDoc()
    .summary('权限菜单')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Get('/permmenu')
  async permmenu() {
    return this.ok(
      await this.baseSysPermsService.permmenu(this.ctx.admin.roleIds)
    );
  }

  /**
   * 文件上传
   */
  @(CreateApiDoc()
    .summary('文件上传')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/upload')
  async upload() {
    return this.ok(await this.coolFile.upload(this.ctx));
  }

  /**
   * 文件上传模式，本地或者云存储
   */
  @(CreateApiDoc()
    .summary('文件上传模式，本地或者云存储')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Get('/uploadMode')
  async uploadMode() {
    return this.ok(this.coolFile.getMode());
  }

  /**
   * 退出
   */
  @(CreateApiDoc()
    .summary('退出')
    .description('')
    .respond(1000, 'success', 'json', { example: [] })
    .build())
  @Post('/logout')
  async logout() {
    await this.baseSysLoginService.logout();
    return this.ok();
  }
}
