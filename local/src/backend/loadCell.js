obtain(['µ/serial.js', 'µ/utilities.js'], ({ Serial }, { averager, round })=> {
  exports.Scale = function () {
    var serial = new Serial();
    this.average = new averager(10);

    this.units = '';

    var prec = 2;

    this.onRead = ()=> {};

    this.setPrecision = prc=> prec = prc;

    Object.defineProperty(this, 'value', {
      get: ()=>round(this.average.ave, prec),
      set: (val)=>this.average.addSample(val),
    });

    serial.open({ manufacturer: 'ftdi' }, 9600);

    serial.onMessage = (data)=> {
      var pol = (data[6] == '+') ? 1 : -1;
      var newRead = pol * parseFloat(data.substring(7, 14));
      this.value = newRead;

      this.onRead();

      this.units = data.substr(14, 15);
    };

    var readInterval = null;

    this.setReadInterval = (time)=> {
      clearInterval(readInterval);
      setInterval(this.requestRead, time);
    };

    this.requestRead = ()=> {
      serial.write('R');
    };

    this.tare = ()=> {
      serial.write('T');
    };

    this.zero = ()=> {
      serial.write('Z');
    };

  };

  provide(exports);
});
