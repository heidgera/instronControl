obtain(['onoff'], ({ Gpio })=> {
  exports.Encoder = function (pinA, pinB) {
    var count = 0;
    Object.defineProperty(this, 'count', {
      get: ()=>count,
    });
    let signals = [new Gpio(pinA, 'in', 'rising'), new Gpio(pinB, 'in')];

    signals[0].watch((err, value)=> {
      if (!err) {
        if (signals[1].readSync()) count++;
        else count--;
      }
    });

    /*signals.forEach((sig, i) => {
      sig.watch((err, value)=> {
        if (!err) {
          let which = (i + 1) % 2;
          if (signals[which].readSync() == which) count++;
          else count--;
        }
      });
    });*/

    this.reset = ()=> {
      count = 0;
    };

    this.close = ()=> {
      signals.forEach(signal => signal.unexport());
    };
  };
});
