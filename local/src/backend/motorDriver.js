obtain(['pigpio'], ({ Gpio })=> {
  exports.Driver = function (outputPin, estopPin) {
    var _this = this;
    var drive = new Gpio(outputPin, { mode: Gpio.OUTPUT });
    var eStop = new Gpio(estopPin, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.EITHER_EDGE,
    });

    _this.currentSpeed = 0;
    _this.currentDirection = 0;

    _this.run = (speed, dir) => {
      speed = Math.min(100, Math.max(0, speed));
      _this.currentSpeed = speed;
      _this.currentDirection = dir;
      motor.servoWrite(1500 + speed * ((dir) ? 5 : -5));
    };

    eStop.on('interrupt', function (level) {
      if (!level) {
        console.log('E-Stop Pressed.');
        _this.run(_this.currentSpeed, !_this.currentDirection);
      }
    });
  };
});
