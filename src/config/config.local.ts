import { ConnectionOptions } from 'typeorm';

// 数据库配置
export const orm: ConnectionOptions = {
  type: 'mysql',
  host: 'k.alio.wang',
  port: 3306,
  username: 'jiahui',
  password: '3EiFzzyWDjXzHM2E',
  database: 'jiahui',
  synchronize: false,
  logging: false,
};
