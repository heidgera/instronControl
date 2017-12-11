'use strict';

var process = require('electron').remote.process;

var obtains = [
  'µ/components',
  './src/interface/cards',
  'µ/components/refDiv.js',
  './src/backend/dummy.js',
];

obtain(obtains, ({ Button, Dropdown, Card, Menu }, mainCards, ref, { Encoder, Scale, driver })=> {
  exports.app = {};

  var encoder = new Encoder(17, 27);

  //var scale = new Scale();

  //scale.setReadInterval(50);
  //scale.setPrecision(1);

  /*scale.onRead = ()=> {
    console.log(`New value is ${scale.value}`);
  };*/

  /*function touchHandler(event) {
    var first = event.changedTouches[0],
        type = '';
    switch (event.type)
    {
    case 'touchstart': type = 'mousedown'; break;
    case 'touchmove':  type = 'mousemove'; break;
    case 'touchend':   type = 'mouseup';   break;
    default:           return;
  }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent('MouseEvent');
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0, null);

    document.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }

  document.addEventListener('touchstart', touchHandler, true);
  document.addEventListener('touchmove', touchHandler, true);
  document.addEventListener('touchend', touchHandler, true);
  document.addEventListener('touchcancel', touchHandler, true);*/

  exports.app.start = ()=> {

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
