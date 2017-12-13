obtain(['pigpio', 'µ/serial.js'], ({ Gpio }, { Serial })=> {
  exports.Driver = function (estopPin) {
    var _this = this;

    var drive = new Serial();
    //var drive = new Gpio(outputPin, { mode: Gpio.OUTPUT });
    var eStop = new Gpio(estopPin, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.EITHER_EDGE,
    });

    _this.currentSpeed = 0;

    var writeToController = (command, data)=> {
      drive.send([128, command, data, (128 + command + data) & 0b01111111]);
    };

    _this.run = (speed) => {
      speed = Math.min(1, Math.max(-1, speed));
      _this.currentSpeed = speed;
      if (speed >= 0) writeToController(0, Math.floor(speed * 127));
      else writeToController(1, Math.floor(Math.abs(speed) * 127));
    };

    _this.ramp = (newSpeed, time = 1000) => {
      newSpeed = Math.min(1, Math.max(-1, newSpeed));
      var inc = (newSpeed - _this.currentSpeed) / 100;
      clearInterval(_this.rampInt);
      _this.rampInt = setInterval(()=> {
        if (Math.abs(_this.currentSpeed - newSpeed) < 2 * inc) {
          clearInterval(_this.rampInt);
          _this.run(newSpeed);
        } else {
          _this.run(_this.currentSpeed + inc);
        }
      }, time / 100);
    };

    _this.forward = (speed)=> {
      clearInterval(_this.rampInt);
      var data = Math.min(1, Math.max(0, speed));
      _this.currentSpeed = data;
      writeToController(0, Math.floor(data * 127));
    };

    _this.backward = (speed)=> {
      clearInterval(_this.rampInt);
      var data = Math.min(1, Math.max(0, speed));
      _this.currentSpeed = -1 * data;
      writeToController(1, Math.floor(data * 127));
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

    drive.open({ name: '/dev/serial0', baud: 9600 });

    eStop.on('interrupt', function (level) {
      if (!level) {
        console.log('E-Stop Pressed.');
        _this.stop();
      }
    });
  };
});
