import { Device } from '@choiceform/os-client-core'

/**
 * 瞎懒惰
 * @param fn
 * @param time
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T, time: number = 0): T {
  let lastId: number = -1;
  return function (this: any): any {
    const args = arguments;
    const scope = this;
    window.clearTimeout(lastId);
    lastId = window.setTimeout(() => {
      fn.apply(scope, args);
    }, time);
  } as any;
}


export function isIE() {
  return Device.browser.name === 'IE';
}