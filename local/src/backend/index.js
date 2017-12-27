var obtains = [
  './src/backend/encoder.js',
  './src/backend/loadCell.js',
  './src/backend/motorDriver.js',
  'pigpio',
];

obtain(obtains, ({ Encoder }, { Scale }, { Driver }, { Gpio })=> {
  if (!window.backend) {
    window.backend = {
      driver: {},
      encoder: new Gpio(pinA, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_DOWN,
      edge: Gpio.EITHER_EDGE,
    })//encoder: new Encoder(17, 27),
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
