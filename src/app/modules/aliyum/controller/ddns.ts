import { Inject, Controller, Provide, Query, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { DdnsParam } from '../dto/ddns';
import { DdnsService } from '../service/ddns';

@Provide()
@Controller('/ddns')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  ddnsService: DdnsService;

  // http://127.0.0.1:7001/ddns/update?AccessKeyId=xxx&AccessKeySecret=xxx&Domain=k.alio.wang
  @Get('/update')
  async getUser(
    @Query() AccessKeyId: string,
    @Query() AccessKeySecret: string,
    @Query() Domain: string
  ) {
    var param = new DdnsParam();
    param.AccessKeyId = AccessKeyId;
    param.AccessKeySecret = AccessKeySecret;
    param.Domain = Domain;
    console.log(param);
    const domainArr = param.Domain.split('.').filter(x => x);
    if (domainArr.length > 1) {
      param.DomainName = domainArr
        .slice(domainArr.length - 2, domainArr.length)
        .join('.');
      param.RRKeyWord = domainArr.slice(0, domainArr.length - 2).join('.');
    }
    const user = await this.ddnsService.updateDdns(param);
    return { success: true, message: 'OK', data: user };
  }
}
