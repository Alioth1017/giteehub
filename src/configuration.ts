import { App, Configuration, Logger } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
// eslint-disable-next-line node/no-extraneous-import
import { IMidwayLogger } from '@midwayjs/logger';
import { Application } from 'egg';

@Configuration({
  // 注意组件顺序 cool 有依赖orm组件， 所以必须放在，orm组件之后 cool的其他组件必须放在cool 核心组件之后
  imports: [
    // 加载 orm 组件
    // 必须，不可移除， https://typeorm.io  打不开？ https://typeorm.biunav.com/zh/
    '@midwayjs/orm',
    // 必须，不可移除， cool-admin 官方组件 https://www.cool-js.com
    'midwayjs-cool-core',
    // oss插件，需要到后台配置之后才有用，默认是本地上传
    'midwayjs-cool-oss',
    // 将缓存替换成redis
    // 'midwayjs-cool-redis',
    // 队列
    // 'midwayjs-cool-queue',
    // 微信支付
    // 'midwayjs-cool-wxpay',
    // 支付宝支付
    // 'midwayjs-cool-alipay',
    // socket
    // 'midwayjs-cool-socket'
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Logger()
  readonly logger: IMidwayLogger;

  // 启动前处理
  async onReady(): Promise<void> {}

  // 可以在这里做些停止后处理
  async onStop(): Promise<void> {}
}
