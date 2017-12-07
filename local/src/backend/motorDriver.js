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

    _this.run = (speed) => {
      speed = Math.min(1, Math.max(-1, speed));
      _this.currentSpeed = speed;
      drive.servoWrite(1500 + speed * 500);
    };

    eStop.on('interrupt', function (level) {
      if (!level) {
        console.log('E-Stop Pressed.');
        _this.run(_this.currentSpeed);
      }
    });
  };
});
