var process = require('electron').remote.process;

var obtains = [
  `µ/components`,
  `./src/backend/${process.platform == 'darwin' ? 'dummy.js' : ''}`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { driver, encoder, scale, config }, { Import })=> {

  Import.onready = ()=> {
    var load = µ('#setPoint');
    var excur = µ('#excursion');
    var duration = µ('#duration');

    load.addEventListener('blur', ()=> {
      if (parseFloat(load.value) > 500) {
        µ('#growl').message('Static Load must be less than 500 pounds', 'warn');
        load.value = 500;
      }
    });

    excur.addEventListener('blur', ()=> {
      if (parseFloat(excur.value) > 30) {
        µ('#growl').message('Max excursion must be less than 30 inches', 'warn');
        excur.value = 30;
      }
    });

    var staticTest = ()=> {
      encoder.reset();

      var loadDir = parseInt(µ('input[name="staticLoadType"]:checked')[0].value);
      var dir = parseInt(µ('input[name="staticDirection"]:checked')[0].value);
      var target = parseFloat(load.value);
      var runtime = parseFloat(duration.value);

      var lastWeight = 0;

      var startTime = Date.now();

      var endTO = 0;

      µ('#staticOL').show = true;

      var scaleInt = setInterval(()=> {
        var weight = scale.value * loadDir;

        if ((Date.now() - startTime) / (runtime * 60000) >= 1) finish();

        µ('#staticOL').setProgress((Date.now() - startTime) / (runtime * 60000));

        if (weight < target * .9) {
          driver.ramp(Math.abs(driver.currentSpeed + .1) * dir);
        } else if (weight > target * 1.1) {
          driver.ramp(Math.abs(driver.currentSpeed - .1) * dir);
        } else {
          driver.ramp(0);
        }
      }, 200);

      var finish = ()=> {
        clearInterval(scaleInt);
        clearTimeout(endTO);
        µ('#staticOL').show = false;
        driver.stop();
      };

      endTO = setTimeout(finish, runtime * 60000);

      µ('#staticOL').onCancel = finish;

      encoder.onCountChange = (count)=> {
        if (Math.abs(count) > parseFloat(excur.value) * config.pulsesPerInch) {
          //end
          finish();
        }
      };

    };

    µ('#staticRun').onclick = ()=> {
      if (!parseFloat(load.value)) {
        µ('#growl').message('Please specify desired load', 'warn');
        return;
      } else if (!µ('input[name="staticDirection"]:checked').length) {
        µ('#growl').message('Please specify a direction.', 'warn');
        return;
      } else if (!µ('input[name="staticLoadType"]:checked').length) {
        µ('#growl').message('Please specify a load type.', 'warn');
        return;
      } else if (!parseFloat(excur.value)) {
        µ('#growl').message('Please specify a maximum excursion.', 'warn');
        return;
      } else if (!parseFloat(duration.value)) {
        µ('#growl').message('Please specify a run time.', 'warn');
        return;
      }
      //// code for running the static loading
      staticTest();
    };
  };
});
