export default class StringTimer {
  constructor(init) {
    Object.assign(this, {
      log: [new Date],        // running log of timestamps
      stamps: {},             // lookup table of manually-named timestamps
      at: null,               // internal position for comparison
      formatter: this.format, // defaults to internal formatter, but may override with any external library
      logLimit: 1000          // trim log to this many entries
    }, init)

  }

  format(duration) {
    let unit = 'ms';

    if (duration > 1000) {
      unit = 'sec';
      duration = duration / 1000;

      if (duration > 60) {
        unit = 'min';
        duration = duration / 60;

        if (duration > 60) {
          unit = 'hour';
          duration = duration / 60;
        }
      }
    }

    return `${duration}${unit}`;
  }

  elapsed(key, distance = 1) {
    return new Date - (this.at || [...this.log].slice(-distance)[0]);
  }

  from(key) {
    this.at = this.stamps[key];
    return this;
  }

  set(key, date = new Date) {
    if (key) {
      this.stamps[key] = date;
    }
    [this.at] = this.log.slice(-1); // sets at cursor to one position back
    this.log = [...this.log, date].slice(-this.logLimit); // append new date to log and take last [logLimit]
    this.total = this.formatter(new Date - this.log[0]);
    return this;
  }

  toString() {
    let elapsed = this.elapsed();
    this.set();
    [this.at] = this.log.slice(-1); // resets at cursor to current last entry

    return this.formatter(elapsed);
  }
}
