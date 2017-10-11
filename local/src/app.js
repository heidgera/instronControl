'use strict';

obtain(['./src/loadCell.js'], ({ Scale })=> {
  exports.app = {};

  var scale = new Scale();

  scale.setReadInterval(50);
  scale.setPrecision(1);

  /*scale.onRead = ()=> {
    console.log(`New value is ${scale.value}`);
  };*/

  setInterval(()=>[
    console.log(`Current value is ${scale.value}`),
  ], 1000);

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
