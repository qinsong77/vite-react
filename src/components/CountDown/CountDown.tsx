import React, {forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useState} from 'react';
import cls from 'classnames';
import { CountDownProps, CountDownInstance } from './PropsType';
import { useCountDown } from './useCountDown';
import { parseFormat } from './utils';

export function noop(): void {}

const CountDown = forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const {relativeTime, absoluteTime, format, millisecond, onChange, onFinish, autoStart } = props;

  const { start, pause, reset, current } = useCountDown({
    time: +relativeTime,
    millisecond: millisecond,
    onChange: onChange,
    onFinish: onFinish,
    absoluteTime: absoluteTime
  });

  const timeText = useMemo(() => parseFormat(format, current), [current]);

  const resetTime = () => {
    !absoluteTime && reset(+relativeTime);

    if (autoStart) {
      start(+relativeTime);
    }
  };

  useEffect(() => {
    resetTime();

    return () => {
      pause();
    };
  }, [relativeTime, absoluteTime]);

  useImperativeHandle(ref, () => ({
    start,
    pause,
    reset: resetTime,
  }));

  return (
    <div className={cls(props.className)} style={props.style} dangerouslySetInnerHTML={{__html: timeText}}>
    </div>
  );
});

CountDown.defaultProps = {
  autoStart: true,
  relativeTime: 0,
  absoluteTime: undefined,
  format: 'HH:mm:ss',
  onChange: noop,
  onFinish: noop,
};

export default CountDown;
