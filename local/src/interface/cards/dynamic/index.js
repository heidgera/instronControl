var process = require('electron').remote.process;

var obtains = [
  `µ/components`,
  'µ/google',
  `./src/backend/${process.platform == 'darwin' ? 'dummy.js' : ''}`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { drive, sheets, gmail }, { driver, encoder, scale, config }, { Import })=> {

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

      µ('#dynamicOL').show = true;

      var data = [];

      var totalExc = config.pulsesPerInch * parseFloat(excur.value);

      console.log(`Total number of counts expected ${totalExc}`);

      var updateInt = setInterval(()=> {
        µ('#mainMenu').title = scale.value;
        µ('#dynamicOL').setProgress(encoder.count / (totalExc));
      }, 200);

      var createOrGetSheet = (name, parentFolderId, cb)=> {
        drive.listFiles({
          parentId: parentFolderId,
          fields: 'files(id)',
          queryString: `name = '${name}'`,
        }, (files)=> {
          //console.log(files);
          if (files && files.length) cb(files[0]);
          else {
            sheets.createSheet({
              title: name,
            }, (file)=> {
                console.log(file);
                drive.moveFile({
                  fileId: file.spreadsheetId,
                  parentId: parentFolderId,
                }, ()=> {
                  cb(file);
                });
              });
          }
        });
      };

      var onEnd = ()=> {
        // handle email, etc
        clearInterval(updateInt);
        createOrGetSheet(
          `DynamicTest ${new Date(Date.now()).toLocaleString('en-US')}`,
          '18YZXzXFi1fkjhyYAcd_4GhH49vT1nL6_',
          (file)=> {
            // have spreadsheetId here
            var cellData = data.map(cell=>[cell.count, cell.force]);
            sheets.putData(file.spreadsheetId, 'Sheet1!A1:E', cellData, ()=> {
              gmail.sendMessage({
                from: 'instron.control@gmail.com',
                to: email.value,
                subject: 'New Instron DynamicTest Data',
                body: `New data have been created: ${file.spreadsheetUrl}`,
              });
            });
          }
        );
        //console.log(data);
      };

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
