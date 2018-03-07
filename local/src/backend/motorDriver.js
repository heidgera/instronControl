obtain(['onoff', 'µ/serial.js', 'µ/utilities.js'], ({ Gpio }, { Serial }, { sign })=> {
  exports.Driver = function (limitPin, eStopPin, stopPin) {
    var _this = this;

    var drive = new Serial();
    //var drive = new Gpio(outputPin, { mode: Gpio.OUTPUT });
    var limit = new Gpio(limitPin, 'in', 'both');
    var eStop = new Gpio(eStopPin, 'in', 'both');
    var stopPin = new Gpio(stopPin, 'out');

    stopPin.writeSync(1);

    _this.currentSpeed = 0;
    _this.limited = 0;
    _this.eStopped = 0;

    var writeToController = (command, data)=> {
      if (data > 0 || data < 0) stopPin.writeSync(0);
      else stopPin.writeSync(1);

      drive.send([128, command, data, (128 + command + data) & 0b01111111]);
    };

    _this.run = (speed) => {
      if (!_this.eStopped && (_this.limited != sign(speed) || speed == 0)) {
        speed = Math.min(1, Math.max(-1, speed));
        _this.currentSpeed = speed;

        if (speed >= 0) writeToController(0, Math.floor(speed * 127));
        else writeToController(1, Math.floor(Math.abs(speed) * 127));
      }
    };

    _this.ramp = (newSpeed, time = 1000) => {
      if (!_this.eStopped && (_this.limited != sign(speed) || speed == 0)) {
        newSpeed = Math.min(1, Math.max(-1, newSpeed));
        var inc = (newSpeed - _this.currentSpeed) / 100;
        clearInterval(_this.rampInt);
        _this.rampInt = setInterval(()=> {
          if (Math.abs(_this.currentSpeed - newSpeed) < Math.abs(2 * inc)) {
            clearInterval(_this.rampInt);
            _this.run(newSpeed);
          } else {
            _this.run(_this.currentSpeed + inc);
          }
        }, time / 100);
      }
    };

    _this.forward = (speed)=> {
      if (!_this.eStopped && (_this.limited != 1)) {
        clearInterval(_this.rampInt);
        var data = Math.min(1, Math.max(0, speed));
        _this.currentSpeed = data;
        writeToController(0, Math.floor(data * 127));
      }
    };

    _this.backward = (speed)=> {
      if (!_this.eStopped && (_this.limited != -1)) {
        clearInterval(_this.rampInt);
        var data = Math.min(1, Math.max(0, speed));
        _this.currentSpeed = -1 * data;
        writeToController(1, Math.floor(data * 127));
      }
    };

    _this.stop = ()=> {
      clearInterval(_this.rampInt);
      _this.currentSpeed = 0;
      writeToController(0, 0);
    };

    _this.onReady = ()=> {};

    drive.onOpen = ()=> {
      drive.send([170]);
      _this.stop();

      _this.onReady();
    };

    drive.open({ name: 'ttyS0', baud: 9600 });

    _this.onEStop = ()=> {};

    _this.onEStopClear = ()=> {};

    _this.onLimit = ()=> {};

    _this.onLimitClear = ()=> {};

    var eStopDebounce = null;
    var limitDebounce = null;

    eStop.watch((err, val)=> {
      clearTimeout(eStopDebounce);
      eStopDebounce = setTimeout(()=> {
        if (val) {
          _this.stop();
          console.log('E-Stop Pressed.');
          _this.onEStop();
        } else {
          console.log('E-Stop Cleared');
          _this.onEStopClear();
        }
      }, 50);

      _this.eStopped = !val;
    });

    limit.watch((err, val)=> {
      clearTimeout(limitDebounce);
      limitDebounce = setTimeout(()=> {
        if (!val) {
          _this.limited = _this.currentSpeed / Math.abs(_this.currentSpeed);
          _this.stop();
          console.log('Limit Pressed.');
          _this.onLimit();
        } else {
          console.log('Limit Cleared');
          _this.limited = 0;
          _this.onLimitClear();
        }
      }, 50);
    });

    _this.close = ()=> {
      _this.stop();
      eStop.unexport();
      limit.unexport();
      stop.unexport();
    };
  };
});
