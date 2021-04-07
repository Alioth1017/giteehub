import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617624620417_7692';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };
  config.orm = {
    default: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'homestead',
      password: 'TxmYxSsmY4im5HsX',
      database: 'homestead',
      synchronize: false,
      logging: false,
    },
  };
  return config;
};
