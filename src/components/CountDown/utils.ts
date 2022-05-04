import { CurrentTime } from './PropsType';

export function padZero(num: number | string, targetLength = 2): string {
  let str = `${num}`;

  while (str.length < targetLength) {
    str = `0${str}`;
  }

  return str;
}

export function parseFormat(format: string, currentTime: CurrentTime): string {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;

  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days));
  } else {
    hours += days * 24;
  }

  if (format.includes('HH')) {
    format = format.replace('HH', padZero(hours));
  } else {
    minutes += hours * 60;
  }

  if (format.includes('mm')) {
    format = format.replace('mm', padZero(minutes));
  } else {
    seconds += minutes * 60;
  }

  if (format.includes('ss')) {
    format = format.replace('ss', padZero(seconds));
  } else {
    milliseconds += seconds * 1000;
  }

  if (format.includes('S')) {
    const ms = padZero(milliseconds, 3);

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms);
    } else if (format.includes('SS')) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}

export const inBrowser = typeof window !== 'undefined';

// @ts-ignore

let prev = Date.now();

function rafPolyfill(fn: FrameRequestCallback) {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

export function raf(fn: FrameRequestCallback): number {
  const requestAnimationFrame = window.requestAnimationFrame || rafPolyfill;
  return requestAnimationFrame.call(window, fn);
}

export function cancelRaf(id: number) {
  const cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
  cancelAnimationFrame.call(window, id);
}

