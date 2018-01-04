var process = require('electron').remote.process;

var obtains = [
  `µ/components`,
  `./src/backend/${process.platform == 'darwin' ? 'dummy.js' : ''}`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { driver, encoder, scale, config }, { Import })=> {

  Import.onready = ()=> {
    var excur = µ('#totExc');
    var pointFreq = µ('#pointFreq');
    var email = µ('#email');
    var speed = µ('#speed', Import.refDiv);

    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    speed.addEventListener('change', ()=> {
      µ('#speedVal').textContent = speed.value + '%';
    });

    excur.addEventListener('blur', ()=> {
      if (parseFloat(excur.value) > 30) {
        µ('#growl').message('Max excursion must be less than 30 inches', 'warn');
        excur.value = 30;
      }
    });

    email.addEventListener('blur', ()=> {
      if (!emailPattern.test(email.value)) {
        µ('#growl').message('Enter valid email address', 'warn');
        email.value = '';
      }
    });

    µ('#dynamicOL').onready = ()=> {
      µ('#dynamicOL').onCancel = ()=> {
        driver.ramp(0, 100);
      };
    };

    var dynamicTest = ()=> {
      encoder.reset();
      scale.tare();
      scale.setReadInterval(100);

      µ('#dynamicOL').show = true;

      var data = [];

      var onEnd = ()=> {
        // handle email, etc
        console.log(data);
      };

      var totalExc = config.pulsesPerInch * parseFloat(excur.value);

      encoder.onCountChange = (count)=> {
        count = Math.abs(count);
        if (!(count % (config.pulsesPerInch / parseFloat(pointFreq.value)))) {
          data.push({ count: count, force: scale.value });
        }

        if (count >= totalExc) {
          driver.ramp(0, 100);
          encoder.onCountChange = ()=> {};

          µ('#dynamicOL').show = false;
          onEnd();
        }

        if (!(count % (totalExc / 100))) {
          ov.setProgress(count / (totalExc));
        }
      };

      var dir = parseInt(µ('input[name="dynamicDirection"]:checked')[0].value);
      console.log('dir');
      driver.ramp(dir * config.maxSpeed * (speed.value / 100.), 500);
    };

    µ('#dynamicRun').onclick = ()=> {
      if (!pointFreq.value) {
        µ('#growl').message('Please specify a data record frequency', 'warn');
        return;
      } else if (!excur.value) {
        µ('#growl').message('Please specify desired distance', 'warn');
        return;
      } else if (!µ('input[name="dynamicDirection"]:checked').length) {
        µ('#growl').message('Please specify a direction.', 'warn');
        return;
      } else if (!emailPattern.test(email.value)) {
        µ('#growl').message('Enter valid email address', 'warn');
        return;
      }

      //// code for running the dynamic test
      dynamicTest();
    };

  };
});
