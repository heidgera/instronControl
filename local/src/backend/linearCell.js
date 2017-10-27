obtain(['./src/backend/encoder.js', './src/backend/loadCell.js'], ({ Encoder }, { Scale })=> {
  exports.LinearCell = function () {
    this.encoder = new Encoder(17, 27);
    this.scale = new Scale();

    Object.defineProperty(this, 'currentPosition', {
      get: ()=>this.encoder.count,
    });

    Object.defineProperty(this, 'currentForce', {
      get: ()=>this.scale.value,
    });
  };
});
