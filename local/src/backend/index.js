var obtains = [
  './src/backend/encoder.js',
  './src/backend/loadCell.js',
  './src/backend/motorDriver.js',
  'onoff',
];

obtain(obtains, ({ Encoder }, { Scale }, { Driver }, { Gpio })=> {
  if (!window.backend) {
    var test = new Gpio(4, 'in', 'both');
    window.backend = {
      driver: {},
      encoder: {},//encoder: new Encoder(17, 27),
      scale: new Scale(),
    };

    window.backend.driver.onReady = ()=> {
      console.log('Motor ready');
    };
  }

  exports.driver = window.backend.driver;
  //exports.encoder = window.backend.encoder;
  exports.scale = window.backend.scale;
});
