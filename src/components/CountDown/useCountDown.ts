import {useEffect, useMemo, useRef, useState} from 'react';
import { inBrowser } from './utils';
import { cancelRaf, raf } from './utils';
import { CurrentTime, UseCountDownOptions } from './PropsType';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function parseTime(time: number): CurrentTime {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

export function useCountDown(options: UseCountDownOptions) {
  const rafId = useRef(0);
  const endTime = useRef(0);
  const counting = useRef(false);

  const [remain, updateRemain] = useState(() =>
    options.absoluteTime ? (+options.absoluteTime - Date.now()) : options.time);

  const current = useMemo(() => parseTime(remain), [remain]);

  const pause = () => {
    counting.current = false;
    cancelRaf(rafId.current);
  };


  const getCurrentRemain = () => Math.max(endTime.current - Date.now(), 0);

  const setRemain = (value: number) => {
    updateRemain(value);
    options.onChange?.(current);

    if (value === 0) {
      pause();
      options.onFinish?.();
    }
  };

  const microTick = () => {
    rafId.current = raf(() => {
      if (counting.current) {
        setRemain(getCurrentRemain());

        if (remain > 0) {
          microTick();
        }
      }
    });
  };

  const macroTick = () => {
    rafId.current = raf(() => {
      if (counting.current) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remain) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remain > 0) {
          macroTick();
        }
      }
    });
  };

  const tick = () => {
    if (!inBrowser) {
      return;
    }

    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };

  const start = (time?: number) => {
    if (!counting.current) {
      if (options.absoluteTime) endTime.current = +options.absoluteTime
      else endTime.current = Date.now() + (time || remain);
      counting.current = true;
      tick();
    }
  };

  const reset = (totalTime: number = options.time) => {
    pause();
    updateRemain(totalTime);
  };

  return {
    start,
    pause,
    reset,
    current,
  };
}
