obtain(['onoff'], ({ Gpio })=> {
  exports.Encoder = function (pinA, pinB) {
    var count = 0;
    Object.defineProperty(this, 'count', {
      get: ()=>count,
    });
    let signals = [new Gpio(pinA, 'in', 'both'), new Gpio(pinB, 'in', 'both')];
    let state = [0, 0];

    /*signals[0].watch((err, value)=> {
      if (!err) {
        if (signals[1].readSync()) count++;
        else count--;
      }
    });*/

    signals.forEach((sig, i) => {
      sig.watch((err, value)=> {
        if (!err) {
          sig.state = value;
          if (i == 0 && sig.state) {
            if (signals[1].state) count++;
            else count--;
          }
        }
      });
    });

    this.reset = ()=> {
      count = 0;
    };

    this.close = ()=> {
      signals.forEach(signal => signal.unexport());
    };
  };
});
