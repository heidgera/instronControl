var obtains = [
  './src/backend/encoder.js',
  './src/backend/loadCell.js',
  './src/backend/motorDriver.js'
];

obtain(, ({ Encoder }, { Scale }, {Driver})=> {
  exports.Encoder = Encoder;
  exports.Scale = Scale;
  exports.Driver = Driver;
});
