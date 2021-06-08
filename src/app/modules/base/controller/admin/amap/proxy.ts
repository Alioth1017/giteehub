import { ALL, Body, Post, Provide } from '@midwayjs/decorator';
import axios from 'axios';
import { CoolController, BaseController } from 'midwayjs-cool-core';

/**
 * 高德地图
 */
@Provide()
@CoolController('/amap')
export class AmapController extends BaseController {
  /**
   * 高德地图代理
   */
  @Post('/proxy')
  async order(@Body(ALL) params: any) {
    const res = await axios({
      baseURL: 'https://restapi.amap.com',
      url: params.url,
      method: params.method || 'get',
      params: params.params
        ? Object.assign(
            { key: '93a4d7bf1d126c1dfaee58602f345d1b' },
            params.params
          )
        : undefined,
      data: params.body,
      headers: params.headers,
    });
    console.log(res.data);
    return this.ok(res.data);
  }
}
