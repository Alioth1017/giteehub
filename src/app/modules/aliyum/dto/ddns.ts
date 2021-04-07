import { Config } from '@alicloud/pop-core';

export class DdnsParam {
  // @ApiProperty({
  //   description: 'AccessKeyId',
  // })
  AccessKeyId: string;
  // @ApiProperty({
  //   description: 'AccessKeySecret',
  // })
  AccessKeySecret: string;
  // @ApiProperty({
  //   description: '域名',
  // })
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
