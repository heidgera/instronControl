'use strict';

obtain(['µ/serial.js'], ({ Serial })=> {
  exports.app = {};

  var serial = new Serial();

  serial.open('usbserial', 9600);

  serial.onMessage = (data)=> {
    var pol = (data[6] == '+') ? 1 : -1;
    console.log(pol * parseFloat(data.substring(7, 14)));
    var units = data.substr(14, 15);
  };

  setInterval(()=> {
    serial.write('R');
    //console.log('Sent!');
  }, 500);

  exports.app.start = ()=> {
    console.log('started');

    document.onkeypress = (e)=> {
      if (e.key == ' ') console.log('Space pressed');
    };

    document.onkeyup = (e)=> {
      if (e.which == 27) {
        var electron = require('electron');
        electron.remote.process.exit();
      }
    };
  };

  provide(exports);
});
