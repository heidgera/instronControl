var obtains = [
  `µ/components`,
  'os',
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, os, { Import })=> {
  var setWifiOptsStartPos = ()=> {
    var rect = µ('#wifiIcon').getBoundingClientRect();
    µ('#wifiOpts').style.removeProperty('--button-pos-x');
    µ('#wifiOpts').style.setProperty('--button-pos-x', (window.innerWidth - rect.left) + 'px');
    µ('#wifiOpts').style.removeProperty('--button-pos-y');
    µ('#wifiOpts').style.setProperty('--button-pos-y', rect.bottom + 'px');
  };

  /*wifi.init({
    iface: null,
  });*/

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

      µ('#wifiPass').onclick = ()=> {
        µ('#wifiPass').select();
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
});
