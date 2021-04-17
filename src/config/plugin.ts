import { EggPlugin } from 'egg';

// snowflake id generator
export const koid = {
  enable: true,
  package: 'egg-koid',
};

export default {
  static: true, // default is true
  logrotator: false, // disable when use @midwayjs/logger
  koid,
  view: true,
  schedule: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
} as EggPlugin;
