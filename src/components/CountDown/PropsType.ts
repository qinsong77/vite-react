import { CSSProperties } from 'react';

export type CurrentTime = {
  /** 剩余总时间（单位毫秒）	 */
  total: number;
  /** 剩余天数	 */
  days: number;
  /** 剩余小时	 */
  hours: number;
  /** 剩余分钟	 */
  minutes: number;
  /** 剩余秒数	 */
  seconds: number;
  /** 剩余毫秒	 */
  milliseconds: number;
};

export type UseCountDownOptions = {
  time: number;
  millisecond?: boolean;
  onChange?: (current: CurrentTime) => void;
  onFinish?: () => void;
  absoluteTime?: number | string | undefined | null;
};

export type CountDownInstance = {
  /** 开始倒计时	 */
  start: () => void;
  /** 暂停倒计时	 */
  pause: () => void;
  /** 重设倒计时，若 autoStart 为 true，重设后会自动开始倒计时	 */
  reset: () => void;
};

export interface CountDownProps {
  style?: CSSProperties;
  className?: string;
  /**
   * 是否自动开始倒计时
   * @default true
   */
  autoStart?: boolean;
  /**
   * 是否开启毫秒级渲染
   */
  millisecond?: boolean;
  /**
   * 倒计时时长，单位毫秒,相对时间
   * @default 0
   */
  relativeTime?: number | string;
  /**
   * 倒计时终止时间，单位毫秒，绝对时间
   * @default 0
   */
  absoluteTime?: number | string | undefined | null;
  /**
   * 时间格式
   * @default 'HH:mm:ss'
   */
  format?: 'HH:mm:ss' | 'HH:mm:ss:SS' | 'DD:HH:mm:ss' | 'DD:HH:mm:ss:SS' | 'HH 时 mm 分 ss 秒' | 'HH 时 mm 分 ss 秒 SS' | 'DD 天 HH 时 mm 分 ss 秒' | 'DD 天 HH 时 mm 分 ss 秒 SS';
  /** 倒计时变化时触发	 */
  onChange?: (currentTime: CurrentTime) => void;
  /** 倒计时结束时触发	*/
  onFinish?: () => void;
  children?: (currentTime: CurrentTime) => React.ReactNode;
}
