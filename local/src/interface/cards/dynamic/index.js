var process = require('electron').remote.process;

var obtains = [
  `µ/components`,
  `./src/backend/${process.platform == 'darwin' ? 'dummy.js' : ''}`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { driver }, { Import })=> {

  Import.onready = ()=> {
    var excur = µ('#totExc');
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

    µ('#dynamicRun').onclick = ()=> {
      if (!excur.value) {
        µ('#growl').message('Please specify desired distance', 'warn');
        return;
      } else if (!µ('input[name="dynamicDirection"]:checked').length) {
        µ('#growl').message('Please specify a direction.', 'warn');
        return;
      } else if (!emailPattern.test(email.value)) {
        µ('#growl').message('Enter valid email address', 'warn');
        return;
      }

      //// code for running the static loading
    };
  };
});
