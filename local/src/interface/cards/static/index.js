var process = require('electron').remote.process;

var obtains = [
];

obtain(obtains, ()=> {

  // Import.onready = ()=> {
  //   var load = µ('#setPoint');
  //   var excur = µ('#excursion');
  //
  //   load.addEventListener('blur', ()=> {
  //     if (parseFloat(load.value) > 500) {
  //       µ('#growl').message('Static Load must be less than 500 pounds', 'warn');
  //       load.value = 500;
  //     }
  //   });
  //
  //   excur.addEventListener('blur', ()=> {
  //     if (parseFloat(excur.value) > 30) {
  //       µ('#growl').message('Max excursion must be less than 30 inches', 'warn');
  //       excur.value = 30;
  //     }
  //   });
  //
  //   µ('#staticRun').onclick = ()=> {
  //     if (!parseFloat(load.value)) {
  //       µ('#growl').message('Please specify desired load', 'warn');
  //       return;
  //     } else if (!µ('input[name="staticDirection"]:checked').length) {
  //       µ('#growl').message('Please specify a direction.', 'warn');
  //       return;
  //     } else if (!parseFloat(excur.value)) {
  //       µ('#growl').message('Please specify a maximum excursion.', 'warn');
  //       return;
  //     }
  //
  //     //// code for running the static loading
  //   };
  // };
});
