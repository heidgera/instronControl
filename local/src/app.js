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

  exports.app.start = ()=> {
    if (process.platform == 'darwin') {
      µ('.rotator')[0].className = 'normal';
    }

    console.log('started');

    µ('#wifiConfig').onready = ()=> {
      wifi.scan((err, networks)=> {
        µ('#ssids').disabled = false;
        µ('#ssids').default = 'Choose a network';
        µ('#ssids').innerHTML = '';
        networks.forEach((ntwk, ind)=> {
          if (µ(`[value="${ntwk}"]`, µ('#ssids')).length == 0) {
            let newOpt = µ('+drop-opt', µ('#ssids'));
            newOpt.textContent = ntwk;
            newOpt.value = ntwk;
          }
        });
      });

      µ('#accept').onclick = ()=> {
        if (!µ('#ssids').value) {
          µ('#growl').message('Please select an Access Point', 'warn');
          return;
        }

        let loading = µ('+div', µ('body')[0]);
        loading.className = 'loadingOverlay';
        loading.textContent = 'Loading...';
        wifi.connect({ ssid: µ('#ssids').value, password: µ('#wifiPass').value }, function (err) {
          if (err) {
            console.log(err);
            return;
          }

          µ('#growl').message(`Connected to ${µ('#ssids').value}`, 'success');
          loading.parentElement.removeChild(loading);
        });

        µ('#wifiOpts').opened = false;
      };
    };

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
