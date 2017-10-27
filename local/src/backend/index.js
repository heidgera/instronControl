console.log(__dirname);

obtain(['./src/backend/encoder.js', './src/backend/loadCell.js'], ({ Encoder }, { Scale })=> {
  exports.Encoder = Encoder;
  exports.Scale = Scale;
});
