import { EggPlugin } from 'egg';

// 启用redis
export const redis = {
  enable: true,
  package: 'egg-redis',
};

// 启用jwt验证
export const jwt = {
  enable: true,
  package: '@waiting/egg-jwt',
};

// snowflake id generator
export const koid = {
  enable: true,
  package: 'egg-koid',
};

export default {
  static: false, // default is true
  logrotator: false, // disable when use @midwayjs/logger
  redis,
  jwt,
  koid,
} as EggPlugin;
