'use strict';

var obtains = [
  'µ/components',
];

obtain(obtains, ({ Button, Dropdown, Card, Menu })=> {
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
      //µ('.rotator')[0].className = 'normal';
    }

    console.log('started');

    document.onkeydown = (e)=> {
      if (e.key == ' ') console.log('Space pressed');
    };

    µ('#wifiConfig').onready = ()=> {
        µ('input', µ('#wifiConfig')).forEach((el)=> {
          var checkClick = (e)=> {
            if (e.target != document.activeElement && e.target.parentElement.id != 'keyboard')
              el.blur();
          };

          el.onclick = ()=> {
            el.focus();
          };

          el.onfocus = ()=> {
            µ('#keyboardDiv').classList.add('show');
            document.addEventListener('click', checkClick);
          };

          el.onblur = ()=> {
            µ('#keyboardDiv').classList.remove('show');
            document.removeEventListener('click', checkClick);
          };
        });

        µ('#wifiConfig').onready = ()=> {
          var checkWifiConnection = ()=> {
            var interfaces = os.networkInterfaces();
            for (var k in interfaces) {
              for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                  µ('#question').style.display = 'none';
                  µ('#wifiIcon').style.color = 'currentColor';
                }
              }
            }
          };

          checkWifiConnection();

          µ('#ssids').disabled = true;

          wifi.scan((err, networks)=> {
            console.log(networks);
            if (err) {
              console.log(err);
            } else {
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
            }
          });

          µ('#wifiPass').onclick = ()=> {
            µ('#wifiPass').select();
          };

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

          µ('#cancel').onclick = ()=> µ('#wifiOpts').opened = false;

          µ('#wifiIcon').onclick = (e)=> {
            e.stopPropagation();
            //setWifiOptsStartPos();
            µ('#wifiOpts').opened = !µ('muse-card')[0].opened;
          };

          µ('#wifiOpts').makeTransitionState('opened', 'closed');

          µ('#wifiOpts').onOpened = ()=> {
            µ('#wifiIcon').classList.add('opened');
          };

          µ('#wifiOpts').onClickOutsideCard = (e)=> {
            if (e.target.parentElement.id != 'keyboard')
              if (µ('#wifiOpts').opened) µ('#wifiOpts').opened = false;
          };

          µ('#wifiOpts').onClosed = ()=> {
            µ('#wifiIcon').classList.remove('opened');
          };
        };
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
