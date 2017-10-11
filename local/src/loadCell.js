obtain(['µ/serial.js', 'µ/utilities.js'], ({ Serial }, { averager })=> {
  exports.Scale = function () {
    var serial = new Serial();
    this.average = new averager(10);

    this.units = '';

    this.onRead = ()=> {};

    Object.defineProperty(this, 'value', {
      get: ()=>this.average.ave,
      set: this.average.addSample,
    });

    serial.open('usbserial', 9600);

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
      setInterval(requestRead, time);
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
