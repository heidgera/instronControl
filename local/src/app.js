'use strict';

var process = require('electron').remote.process;

var obtains = [
  'µ/components',
  './src/interface/cards',
  'µ/components/refDiv.js',
  './src/backend',
];

obtain(obtains, ({ Button, Dropdown, Card, Menu }, mainCards, ref, { Encoder, Scale, Driver })=> {
  exports.app = {};

  var encoder = new Encoder(17, 27);
  var driver = new Driver(12, 25);

  //var scale = new Scale();

  //scale.setReadInterval(50);
  //scale.setPrecision(1);

  /*scale.onRead = ()=> {
    console.log(`New value is ${scale.value}`);
  };*/

  exports.app.start = ()=> {

    setInterval(()=> {
      //µ('#outer').textContent = encoder.count;
      driver.run(1, 0);
      setTimeout(()=> {
        driver.run(0, 0);
        setTimeout(()=> {
          driver.run(0, 1);
        }, 1000);
      }, 2000);

    }, 5000);

    mainCards.setup();

    console.log('started');

    window.inputSetup = (el)=> {
      let method = el.getAttribute('method');
      if (!method) method = 'keyboard';

      var checkClick = (e)=> {
        if (e.target != document.activeElement &&
            e.target.parentElement.id != method &&
            e.target.id != method)
          el.blur();
      };

      el.onclick = ()=> {
        el.focus();
      };

      el.onfocus = ()=> {
        µ(`#${method}Div`).classList.add('show');
        µ('.mainContainer')[0].classList.add('inputActive');
        document.addEventListener('click', checkClick);
      };

      el.onblur = ()=> {
        µ(`#${method}Div`).classList.remove('show');
        µ('.mainContainer')[0].classList.remove('inputActive');
        document.removeEventListener('click', checkClick);
      };

    };

    document.onkeydown = (e)=> {
      if (e.key == ' ') console.log('Space pressed');
    };

    document.onkeyup = (e)=> {
      if (e.which == 27) {
        process.kill(process.pid, 'SIGINT'); //doesn't actually kill, just sends signal
      } else if (e.which == 73 && e.getModifierState('Control') &&  e.getModifierState('Shift')) {
        remote.getCurrentWindow().toggleDevTools();
      }
    };

    process.on('SIGINT', ()=> {
      //cleanup funcitons here
      //encoder.close();
      process.nextTick(function () { process.exit(0); });
    });
  };

  provide(exports);
});
