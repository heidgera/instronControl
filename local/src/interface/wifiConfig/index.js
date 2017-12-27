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

  /*wifi.init({
    iface: null,
  });*/
});
