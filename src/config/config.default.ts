import { EggAppInfo } from 'egg';
import { ConnectionOptions } from 'typeorm';

import { security } from './config.unittest';
import { DefaultConfig } from './config.types';

export default (appInfo: EggAppInfo): DefaultConfig => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617624620417_7692';

  // add your config here
  config.middleware = ['jwtAuth'];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // 默认管理员
  config.admin = {
    username: 'admin',
    password: 'admin',
  };

  // 数据库配置
  config.orm = {
    default: {
      type: 'mysql',
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: process.env.MYSQL_HOST || 3306,
      username: process.env.MYSQL_USER || '',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || undefined,
      synchronize: false,
      logging: true,
      timezone: '+08:00',
    } as ConnectionOptions,
  };

  // redis配置
  config.redis = {
    client: {
      port: +process.env.REDIS_PORT || 6379, // Redis port
      host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD || '',
      db: +process.env.REDIS_DB || 0,
    },
  };

  // jwt配置
  config.jwt = {
    enable: true,
    client: {
      secret: 'j1$0(9', // 默认密钥，生产环境一定要更改
    },
    // rule https://github.com/eggjs/egg-path-matching
    ignore: ['/auth/login', '/ping', '/swagger-u*', '/genid', '/genidHex', '/aliyun*'],
  };

  // jwt token 校验中间件(需配合jwt使用, ignore的配置与jwt一致)
  config.jwtAuth = {
    ignore: config.jwt.ignore,
    redisScope: 'admin', // redis的作用域前缀
    accessTokenExpiresIn: 60 * 60 * 24 * 3, // 签名过期时间也可写
  };

  // swagger文档配置
  config.swagger = {
    title: 'giteehub',
    description: 'giteehub 模版工程的接口定义',
    version: '1.0.0',
    termsOfService: 'https://github.com/Alioth1017/giteehub',
    contact: {
      name: 'Alioth',
      url: 'https://github.com/Alioth1017',
      email: '',
    },
    license: {
      name: 'MIT',
      url: '',
    },
  };

  // snowflake id generator config
  config.koid = {
    client: {
      koidConfig: {
        dataCenter: 0,
        worker: 0,
      },
    },
  };

  config.security = security;
  return config;
};
