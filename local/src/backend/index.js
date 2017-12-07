var obtains = [
  './src/backend/encoder.js',
  './src/backend/loadCell.js',
  './src/backend/motorDriver.js',
];

obtain(obtains, ({ Encoder }, { Scale }, { Driver })=> {
  exports.Encoder = Encoder;
  exports.Scale = Scale;

  var driver = new Driver(25);

  driver.onReady = ()=> {
    console.log('Motor connected');
  };

  exports.driver = Driver;
});
