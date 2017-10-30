'use strict';

var process = require('electron').remote.process;

obtain(['./src/interface/button.js', './src/interface/dropdown.js'/*, './src/backend'*/], (Button, Dropdown/*, { Encoder, Scale }*/)=> {
  exports.app = {};

  //var encoder = new Encoder(17, 27);

  //var scale = new Scale();

  //scale.setReadInterval(50);
  //scale.setPrecision(1);

  /*scale.onRead = ()=> {
    console.log(`New value is ${scale.value}`);
  };*/

  exports.app.start = ()=> {
    setInterval(()=> {
      //µ('#outer').textContent = encoder.count;
    }, 50);

    µ('but-ton')[0].onPress = ()=> {
      µ('drop-down')[0].addOption('success!', 16);
    };

    console.log('started');

    document.onkeypress = (e)=> {
      if (e.key == ' ') console.log('Space pressed');
    };

    document.onkeyup = (e)=> {
      if (e.which == 27) {
        process.kill(process.pid, 'SIGINT'); //doesn't actually kill, just sends signal
      } else if (e.which == 73 && e.getModifierState('Control') &&  e.getModifierState('Shift')) {
        remote.getCurrentWindow().toggleDevTools();
      }
    };

    process.on('SIGINT', ()=> {
      //cleanup funcitons here
      encoder.close();
      process.nextTick(function () { process.exit(0); });
    });
  };

  provide(exports);
});
