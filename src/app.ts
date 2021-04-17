/* eslint-disable no-console */
import { Application } from 'egg';

// https://eggjs.org/zh-cn/advanced/loader.html
export default class AppBootHook {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad(): void {
    console.log('🚀 Your APP is launching...');
  }

  // Config, plugin files have been loaded.
  configDidLoad(): void {}

  async serverDidReady(): Promise<void> {
    // Server is listening.
    console.log('✅ Your awesome APP launched');
  }
}
