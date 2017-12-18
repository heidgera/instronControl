obtain(['./src/backend/loadCell.js',], ({ Scale })=> {
  exports.Encoder = function () {
    this.reset = ()=> {console.log('encoder reset');};

    this.count = 0;
    this.close = ()=> {};
  };

  exports.Scale = Scale;

  var driver = {
    run: (val)=> { console.log(`Running motor at ${val}`);},

    ramp: (val)=> { console.log(`Ramping motor to ${val}`);},

    forward: (val)=> { console.log(`Motor forward at ${val}`);},

    backward: (val)=> { console.log(`Motor backward at ${val}`);},

    stop: (val)=> { console.log(`Stopping Motor`);},
  };

  driver.onReady = ()=> {
    console.log('Motor connected');
  };

  exports.driver = driver;
});
