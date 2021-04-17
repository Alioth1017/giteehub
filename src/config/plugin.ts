import { EggPlugin } from 'egg';

export default {
  static: true, // default is true
  logrotator: false, // disable when use @midwayjs/logger
  view: true,
  schedule: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
} as EggPlugin;
