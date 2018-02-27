obtain(['onoff'], ({ Gpio })=> {
  exports.Encoder = function (pinA, pinB) {
    var _this = this;
    var count = 0;
    Object.defineProperty(this, 'count', {
      get: ()=>count,
    });
    let signals = [
        new Gpio(pinA, 'in', 'both'),
        new Gpio(pinB, 'in', 'both'),
    ];

    signals.forEach((sig, i) => {
      sig.watch((err, val)=> {
        sig.state = val;
        if (i == 0 && sig.state) {
          if (signals[1].state) count++;
          else count--;

          _this.onCountChange(count);
        }
      });
      /*sig.on('interrupt', function (level) {
        sig.state = level;
        if (i == 0 && sig.state) {
          if (signals[1].state) count++;
          else count--;

          _this.onCountChange(count);
        }
      });*/
    });

    this.reset = ()=> {
      count = 0;
    };

    this.onCountChange = (next)=> {};

    this.close = ()=> {
      signals.forEach(signal => signal.unexport());
    };
  };
});
