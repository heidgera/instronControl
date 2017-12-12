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
    console.log('motor ready');
    setInterval(()=> {
      driver.forward(1);
      setTimeout(driver.stop, 2000);
      setTimeout(()=> {driver.backward(1);}, 3000);
    }, 5000);
  };

  exports.driver = driver;
});
