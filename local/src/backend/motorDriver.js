obtain(['onoff', 'µ/serial.js', 'µ/utilities.js'], ({ Gpio }, { Serial }, { sign })=> {
  exports.Driver = function (limitPin, eStopPin, stopPin) {
    var _this = this;

    var drive = new Serial();
    //var drive = new Gpio(outputPin, { mode: Gpio.OUTPUT });
    var limit = new Gpio(limitPin, 'in', 'both');
    var eStop = new Gpio(eStopPin, 'in', 'both');
    var stop = new Gpio(stopPin, 'out');

    stop.writeSync(1);

    _this.currentSpeed = 0;
    _this.limited = 0;
    _this.eStopped = 0;

    var writeToController = (command, data)=> {
      if (data) stop.writeSync(0);
      else stop.writeSync(1);

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

    eStop.watch((err, val)=> {
      if (!val) {
        console.log('E-Stop Pressed.');
        _this.stop();
      }

      _this.eStopped = !val;
    });

    limit.watch((err, val)=> {
      if (!val) {
        _this.limited = _this.currentSpeed / Math.abs(_this.currentSpeed);
        console.log('Limit switch pressed.');
        _this.stop();
      } else {
        _this.limited = 0;
        console.log('No longer limited');
      }
    });

    _this.close = ()=> {
      _this.stop();
      eStop.unexport();
      limit.unexport();
      stop.unexport();
    };
  };
});
