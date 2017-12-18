'use strict';

var process = require('electron').remote.process;

var obtains = [
  'µ/components',
  './src/backend',
];

obtain(obtains, ({ Button, Dropdown, Card, Menu }, { Encoder, Scale, driver })=> {
  exports.app = {};

  var encoder = new Encoder(17, 27);

  //var scale = new Scale();

  //scale.setReadInterval(50);
  //scale.setPrecision(1);

  /*scale.onRead = ()=> {
    console.log(`New value is ${scale.value}`);
  };*/

  exports.app.start = ()=> {

    console.log('started');

    document.onkeydown = (e)=> {
      if (e.key == ' ') console.log('Space pressed');
    };

    document.onkeyup = (e)=> {
      if (e.which == 27) {
        process.kill(process.pid, 'SIGINT'); //doesn't actually kill, just sends signal
      } else if (e.which == 73 && e.getModifierState('Control') &&  e.getModifierState('Shift')) {
        require('electron').remote.getCurrentWindow().toggleDevTools();
      }
    };

    process.on('SIGINT', ()=> {
      //cleanup funcitons here
      //encoder.close();
      process.nextTick(function () { process.exit(0); });
    });
  };

  provide(exports);
});
