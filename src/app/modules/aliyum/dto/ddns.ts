import { Config } from '@alicloud/pop-core';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class DdnsParam {
  @CreateApiPropertyDoc('AccessKeyId')
  AccessKeyId: string;
  @CreateApiPropertyDoc('AccessKeySecret')
  AccessKeySecret: string;
  @CreateApiPropertyDoc('域名')
  Domain: string;
  DomainName: string;
  RRKeyWord: string;
}

export class AliClientConfig implements Config {
  accessKeyId: string;
  accessKeySecret: string;
  endpoint: string;
  apiVersion: string;
}

export class AliDdnsParam {
  RegionId: string;
  Domain: string;
  DomainName: string;
  RRKeyWord: string;
}

export class AliDdnsRecord {
  RegionId: string;
  RecordId: string;
  RR: string;
  Type: string;
  Value: string;
}
