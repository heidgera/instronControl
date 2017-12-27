'use strict';

var obtains = [
  'µ/components',
  `./src/interface/wifiConfig/wifiControl.js`,
];

obtain(obtains, ({ Button, Dropdown, Card, Menu }, wifi)=> {
  exports.app = {};

  //var encoder = new Encoder(17, 27);

  //var scale = new Scale();

  //scale.setReadInterval(50);
  //scale.setPrecision(1);

  /*scale.onRead = ()=> {
    console.log(`New value is ${scale.value}`);
  };*/

  const { dialog } = require('electron').remote;

  // Disable error dialogs by overriding
  // FIX: https://goo.gl/YsDdsS
  dialog.showErrorBox = function (title, content) {
      console.log(`${title}
${content}`);
    };

  exports.app.start = ()=> {
    if (process.platform == 'darwin') {
      µ('.rotator')[0].className = 'normal';
    }

    console.log('started');

    document.onkeydown = (e)=> {
      if (e.key == ' ') console.log('Space pressed');
    };

    document.onkeyup = (e)=> {
      if (e.which == 27) {
        //process.kill(process.pid, 'SIGINT'); //doesn't actually kill, just sends signal
        process.exit(0);
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
