import { BaseException, RESCODE, RESMESSAGE } from 'midwayjs-cool-core';

/**
 * 通用异常
 */
export class MyException extends BaseException {
  constructor(message: string, code = RESCODE.COMMFAIL) {
    super('MyException', code, message || RESMESSAGE.COMMFAIL);
  }
}
