import {
  Inject,
  Controller,
  Provide,
  Query,
  Get,
  ALL,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { BaseController } from 'midwayjs-cool-core';

import { DdnsParam } from '../dto/ddns';
import { DdnsService } from '../service/ddns';

@Provide()
@Controller('/aliyun', {
  tagName: '阿里云',
  description: '包含DDNS功能',
})
export class APIController extends BaseController {
  @Inject()
  ddnsService: DdnsService;

  // http://127.0.0.1:7001/aliyun/ddns-update?AccessKeyId=xxx&AccessKeySecret=xxx&Domain=k.alio.wang
  @Get('/ddns-update')
  async getUser(ctx: Context, @Query(ALL) query: DdnsParam) {
    const domainArr = query.Domain.split('.').filter(x => x);
    if (domainArr.length > 1) {
      query.DomainName = domainArr
        .slice(domainArr.length - 2, domainArr.length)
        .join('.');
      query.RRKeyWord = domainArr.slice(0, domainArr.length - 2).join('.');
    }
    const result = await this.ddnsService.updateDdns(query);
    this.ok(result);
  }
}
