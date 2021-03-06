var obtains = [
  './src/backend/encoder.js',
  './src/backend/loadCell.js',
  './src/backend/motorDriver.js',
];

obtain(obtains, ({ Encoder }, { Scale }, { Driver })=> {
  if (!window.backend) {
    window.backend = {
      driver: new Driver(25, 18, 12),
      encoder: new Encoder(17, 27),
      scale: new Scale(),
      config: {
        pulsesPerInch: 3190,
        maxSpeed: .5,
      },
    };

    window.backend.scale.setReadInterval(100);

    window.backend.driver.onReady = ()=> {
      console.log('Motor ready');
    };
  }

  exports.driver = window.backend.driver;
  exports.encoder = window.backend.encoder;
  exports.scale = window.backend.scale;
  exports.config = window.backend.config;
});
