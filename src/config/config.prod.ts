import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';

export type DefaultConfig = PowerPartial<EggAppConfig>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // 数据库配置
  config.orm = {
    default: {
      type: 'mysql',
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '123123',
      database: process.env.MYSQL_DATABASE || 'cool',
      // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
      synchronize: false,
      // 打印日志
      logging: false,
    } as ConnectionOptions,
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'ERROR',
    },
  };

  // cool配置
  config.cool = {
    // 是否初始化模块数据库
    initDB: false,
  };

  return config;
};
