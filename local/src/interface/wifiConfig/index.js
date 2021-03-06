var obtains = [
  `./src/interface/wifiConfig/wifiControl.js`,
  `µ/components`,
  'os',
];

obtain(obtains, (wifi, { Button, Card, Dropdown, Menu }, os, { Import })=> {
  console.log(wifi);

  var setWifiOptsStartPos = ()=> {
    var rect = µ('#wifiIcon').getBoundingClientRect();
    µ('#wifiOpts').style.removeProperty('--button-pos-x');
    µ('#wifiOpts').style.setProperty('--button-pos-x', (window.innerWidth - rect.left) + 'px');
    µ('#wifiOpts').style.removeProperty('--button-pos-y');
    µ('#wifiOpts').style.setProperty('--button-pos-y', rect.bottom + 'px');
  };

  Import.onready = ()=> {

    µ('input', Import.refDiv).forEach((el)=> {
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
      let checkCount = 0;
      let checkInt = 0;

      var checkWifiConnection = (err)=> {
        if (!err) {
          var found = false;

          var interfaces = os.networkInterfaces();
          for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
              var ad = interfaces[k][k2];
              ad.misconfig = ad.address && ad.address.startsWith('169.');
              if (ad.family === 'IPv4' && !ad.internal && !ad.misconfig) {
                found == true;
                µ('#question').style.display = 'none';
                µ('#wifiIcon').style.color = 'currentColor';
                var curSSID = wifi.getSSID();
                if (curSSID) µ('#wifiMenu').title = `Connected to ${curSSID}`;
                µ('#growl').message(`Connected at ${ad.address}`, 'success');
                clearInterval(checkInt);
              } else if (ad.misconfig) {
                wifi.restart(()=> {
                  clearInterval(checkInt);
                  checkInt = setInterval(checkWifiConnection, 1000);
                });
              }
            }
          }

          if (checkCount++ > 10) {
            clearInterval(checkInt);
            µ('#growl').message(`Unable to connect to Wifi Network`, 'warn');
          }
        }

      };

      wifi.restart(()=> {
        clearInterval(checkInt);
        checkInt = setInterval(checkWifiConnection, 1000);
      });

      µ('#ssids').disabled = true;

      wifi.scan((err, networks)=> {
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

          µ('#growl').message(`Attempting connection to ${µ('#ssids').value}`, 'warn');
          checkCount = 0;
          checkInt = setInterval(checkWifiConnection, 1000);
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

      checkInt = setInterval(checkWifiConnection, 1000);
    };
  };
});
