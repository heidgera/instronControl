obtain(['pigpio'], ({ Gpio })=> {
  exports.Encoder = function (pinA, pinB) {
    var count = 0;
    Object.defineProperty(this, 'count', {
      get: ()=>count,
    });
    let signals = [
        new Gpio(pinA, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_DOWN,
        edge: Gpio.EITHER_EDGE,
      }), new Gpio(pinB, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_DOWN,
        edge: Gpio.EITHER_EDGE,
      }),
    ];

    signals.forEach((sig, i) => {
      sig.on('interrupt', function (level) {
        sig.state = level;
        if (i == 0 && sig.state) {
          if (signals[1].state) count++;
          else count--;

          if (!(count % 500)) console.log(count);
        }
      });
    });

    this.reset = ()=> {
      count = 0;
    };

    this.close = ()=> {
      //signals.forEach(signal => signal.unexport());
    };
  };
});
