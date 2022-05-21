const MILLISECONDS_IN_ONE_SECOND = 1000;
const MILLISECONDS_IN_ONE_MINUTE = MILLISECONDS_IN_ONE_SECOND * 60;
const MILLISECONDS_IN_ONE_HOUR = MILLISECONDS_IN_ONE_MINUTE * 60;
const MILLISECONDS_IN_ONE_DAY = MILLISECONDS_IN_ONE_HOUR * 24;
const MILLISECONDS_IN_ONE_WEEK = MILLISECONDS_IN_ONE_DAY * 7;
const SECONDS_IN_ONE_MINUTE = 60;
const SECONDS_IN_ONE_HOUR = SECONDS_IN_ONE_MINUTE * SECONDS_IN_ONE_MINUTE;

export class Duration {
  private _milliseconds = 0;

  static fromTimeString(timeString: string): Duration {
    const TIME_SEPARATOR = ':';
    const ERROR = new Error(`${timeString} could not be parsed`);
    const timeParts = timeString.split(TIME_SEPARATOR).map(Number);

    if (timeParts.some(isNaN)) {
      throw ERROR;
    }

    let hours = 0,
      minutes = 0,
      seconds = 0;

    switch (timeParts.length) {
      case 1:
        [seconds] = timeParts;
        return new Duration({ seconds });
      case 2:
        [minutes, seconds] = timeParts;
        return new Duration({ minutes, seconds });
      case 3:
        [hours, minutes, seconds] = timeParts;
        return new Duration({ hours, minutes, seconds });
      default:
        throw ERROR;
    }
  }

  constructor({ minutes = 0, hours = 0, seconds = 0, milliseconds = 0 } = {}) {
    this._milliseconds += hours * MILLISECONDS_IN_ONE_HOUR;
    this._milliseconds += minutes * MILLISECONDS_IN_ONE_MINUTE;
    this._milliseconds += seconds * MILLISECONDS_IN_ONE_SECOND;
    this._milliseconds += milliseconds;
  }

  get inMilliseconds() {
    return this._milliseconds;
  }
  get inSeconds() {
    return this._milliseconds / MILLISECONDS_IN_ONE_SECOND;
  }
  get inMinutes() {
    return this._milliseconds / MILLISECONDS_IN_ONE_MINUTE;
  }
  get inHours() {
    return this._milliseconds / MILLISECONDS_IN_ONE_HOUR;
  }
  get inDays() {
    return this._milliseconds / MILLISECONDS_IN_ONE_DAY;
  }
  get inWeeks() {
    return this._milliseconds / MILLISECONDS_IN_ONE_WEEK;
  }

  toTimeString(): string {
    const { _padZero, _divisionRemainder } = this;
    const totalSeconds = Math.abs(this.inSeconds);
    if (totalSeconds < SECONDS_IN_ONE_MINUTE) {
      return `00:${_padZero(totalSeconds)}`;
    } else if (totalSeconds < SECONDS_IN_ONE_HOUR) {
      const minutes = _padZero(totalSeconds / SECONDS_IN_ONE_MINUTE);
      const seconds = _padZero(
        _divisionRemainder(totalSeconds, SECONDS_IN_ONE_MINUTE)
      );
      return `${minutes}:${seconds}`;
    }
    const hours = _padZero(totalSeconds / SECONDS_IN_ONE_HOUR);
    const minutes = _padZero(
      _divisionRemainder(totalSeconds, SECONDS_IN_ONE_HOUR) /
        SECONDS_IN_ONE_MINUTE
    );
    const seconds = _padZero(
      _divisionRemainder(totalSeconds, SECONDS_IN_ONE_MINUTE)
    );
    return `${hours}:${minutes}:${seconds}`;
  }

  private _padZero(number = 0) {
    if (number < 10) {
      return `0${parseInt(String(number))}`;
    }
    return `${parseInt(String(number))}`;
  }

  private _divisionRemainder(dividend: number, divider: number) {
    const quotient = parseInt(String(dividend / divider));
    return dividend - quotient * divider;
  }
}
