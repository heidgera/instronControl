obtain(['./src/backend/loadCell.js'], ({ Scale })=> {
  if (!window.backend) {
    window.backend = {
      driver: {
        run: (val)=> { console.log(`Running motor at ${val}`);},

        ramp: (val)=> { console.log(`Ramping motor to ${val}`);},

        forward: (val)=> { console.log(`Motor forward at ${val}`);},

        backward: (val)=> { console.log(`Motor backward at ${val}`);},

        stop: (val)=> { console.log(`Stopping Motor`);},

        close: ()=> { console.log('Close driver');},
      },
      encoder: {
        reset: ()=> { console.log(`Reset encoder`);},

        count: ()=> 1,

        close: ()=> { console.log('Close encoder');},
      },
      scale: new Scale(),
      config: {
        pulsesPerInch: 1000,
        maxSpeed: 1,
      },
    };

    window.backend.driver.onReady = ()=> {
      console.log('Motor ready');
    };
  }

  exports.driver = window.backend.driver;
  exports.encoder = window.backend.encoder;
  exports.scale = window.backend.scale;
  exports.config = window.backend.config;
});
