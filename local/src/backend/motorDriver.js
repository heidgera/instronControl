obtain(['pigpio', 'µ/serial.js'], ({ Gpio }, { Serial })=> {
  exports.Driver = function (outputPin, estopPin) {
    var _this = this;

    var drive = new Serial();
    //var drive = new Gpio(outputPin, { mode: Gpio.OUTPUT });
    var eStop = new Gpio(estopPin, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.EITHER_EDGE,
    });

    _this.currentSpeed = 0;
    _this.currentDirection = 0;

    var writeToController = (command, data)=> {
      drive.send([128, command, Math.floor(data), (128 + command + data) & 0b01111111]);
    };

    _this.run = (speed) => {
      speed = Math.min(1, Math.max(-1, speed));
      _this.currentSpeed = speed;
      if (speed >= 0) _this.forward(speed);
      else _this.backward(Math.abs(speed));
    };

    _this.forward = (speed)=> {
      var data = Math.min(1, Math.max(0, speed));
      writeToController(0, speed * 127);
    };

    _this.backward = ()=> {
      var data = Math.min(1, Math.max(0, speed));
      writeToController(1, speed * 127);
    };

    _this.stop = ()=> {
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
        _this.run(-_this.currentSpeed);
      }
    });
  };
});
