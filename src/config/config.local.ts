import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.orm = {
    default: {
      type: 'mysql',
      host: '192.168.31.179',
      port: 3306,
      username: 'testdb',
      database: 'testdb',
      password: 'zxZDhXrCszNMzmiW',
      // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
      synchronize: false,
      // 打印日志
      logging: false,
    },
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  };

  return config;
};
