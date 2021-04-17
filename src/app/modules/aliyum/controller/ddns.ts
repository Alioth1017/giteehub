import {
  Inject,
  Controller,
  Provide,
  Query,
  Get,
  ALL,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { CreateApiDoc } from '@midwayjs/swagger';

import { DdnsParam } from '../dto/ddns';
import { DdnsService } from '../service/ddns';

@Provide()
@Controller('/aliyun', {
  tagName: '阿里云',
  description: '包含DDNS功能',
})
export class APIController {
  @Inject()
  ddnsService: DdnsService;

  @(CreateApiDoc().summary('DDNS域名解析').description('不需要鉴权').build())
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
    ctx.helper.success(result);
  }
}
