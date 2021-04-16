import * as assert from 'assert';
import MyError from '../../base/util/my-error';
import { Provide } from '@midwayjs/decorator';
import axios from 'axios';
import Core = require('@alicloud/pop-core');
import {
  AliClientConfig,
  AliDdnsParam,
  AliDdnsRecord,
  DdnsParam,
} from '../dto/ddns';

@Provide()
export class DdnsService {
  async updateDdns(param: DdnsParam): Promise<string> {
    const clientConfig = new AliClientConfig();
    clientConfig.accessKeyId = param.AccessKeyId;
    clientConfig.accessKeySecret = param.AccessKeySecret;
    clientConfig.endpoint = 'https://alidns.aliyuncs.com';
    clientConfig.apiVersion = '2015-01-09';
    const client = new Core(clientConfig);
    const ddnsParam = new AliDdnsParam();
    ddnsParam.RegionId = 'cn-hangzhou';
    ddnsParam.Domain = param.Domain;
    ddnsParam.DomainName = param.DomainName;
    ddnsParam.RRKeyWord = param.RRKeyWord;
    const record = await this.getCurrentDomainRecord(client, ddnsParam);
    const dnsIp = record.Value;
    assert.ok(dnsIp, new MyError('阿里云DNS解析 域名信息查询失败', 500));
    const ip = await this.getCurrentIp();
    assert.ok(ip, new MyError('阿里云DNS解析 本机外网IP查询失败', 500));
    assert.ok(
      dnsIp !== ip,
      new MyError(`阿里云DNS解析 DNS-IP：${dnsIp} IP：${ip} 无需更新`, 500)
    );
    const updateRecord = new AliDdnsRecord();
    updateRecord.RegionId = ddnsParam.RegionId;
    updateRecord.RecordId = record.RecordId;
    updateRecord.RR = record.RR;
    updateRecord.Type = 'A';
    updateRecord.Value = ip;
    const updated = await this.updateRecord(client, updateRecord);
    return `阿里云DNS解析 IP更新(${dnsIp})->(${ip}) ${
      updated ? '成功' : '失败'
    }`;
  }

  getCurrentDomainRecord(
    client: Core,
    ddnsParam: AliDdnsParam
  ): Promise<AliDdnsRecord> {
    return new Promise((resolve, reject) => {
      client
        .request('DescribeDomainRecords', ddnsParam, { method: 'POST' })
        .then((result: any) => {
          if (
            result &&
            result.DomainRecords &&
            result.DomainRecords.Record &&
            result.DomainRecords.Record.length
          ) {
            const record = result.DomainRecords.Record.find(
              x => x.RR === ddnsParam.RRKeyWord
            );
            resolve(record);
          } else {
            resolve(null);
          }
        }, reject);
    });
  }

  getCurrentIp(): Promise<string> {
    return new Promise((resolve, reject) => {
      axios
        .get('https://api.ipify.org')
        .then(res => resolve(res.data))
        .catch(reject);
    });
  }

  updateRecord(client: Core, record: AliDdnsRecord): Promise<boolean> {
    return new Promise((resolve, reject) => {
      client
        .request('UpdateDomainRecord', record, { method: 'POST' })
        .then((result: any) => {
          if (
            result &&
            result.RecordId &&
            result.RecordId === record.RecordId
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, reject);
    });
  }
}
