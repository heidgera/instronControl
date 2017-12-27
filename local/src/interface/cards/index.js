
var process = require('electron').remote.process;

var obtains = [
  `µ/components`,
  `./src/backend/${process.platform == 'darwin' ? 'dummy.js' : ''}`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { driver }, { Import })=> {
  Import.onready = (e)=> {

    /////////// Function to handle clicks on input divs /////////////

    var inputSetup = (el)=> {
      let method = el.getAttribute('method');
      if (!method) method = 'keyboard';

      var checkClick = (e)=> {
        if (e.target != document.activeElement &&
            !µ(`#${method}`).contains(e.target))
          el.blur();
      };

      /*el.onclick = ()=> {
        el.focus();
        //setTimeout(()=> {el.scrollIntoView(true);}, 1000);
      };*/

      el.onfocus = ()=> {
        µ(`#${method}Div`).classList.add('show');
        µ('.mainContainer')[0].classList.add('inputActive');
        document.addEventListener('click', checkClick);
      };

      el.addEventListener('blur', ()=> {
        µ(`#${method}Div`).classList.remove('show');
        µ('.mainContainer')[0].classList.remove('inputActive');
        document.removeEventListener('click', checkClick);
      });
    };

    /////////// Setup common actions on the cards /////////////

    µ('.museCard', Import.refDiv).forEach((card, ind, arr)=> {
      card.makeTransitionState('blurred');

      card.onclick = ()=> {
        var other = arr[(ind + 1) % (arr.length)];
        card.focused = true;
        other.blurred = true;
        µ('#close').style.opacity = 1;
        µ('body')[0].classList.add(card.id);
      };

      card.onLoseFocused = ()=> {
        µ('#mainMenu').title = µ('#mainMenu').originalTitle;
      };

      var mouse = {};
      var initScroll = 0;

      var cont = µ('.focusContent', card)[0];

      cont.addEventListener('touchstart', (e)=> {
        if (card.focused) {
          mouse.x = e.touches[0].pageX;
          initScroll = cont.scrollTop;
          document.addEventListener('touchmove', onmousemove);
          document.addEventListener('touchend', onmouseup);
        }

      });

      var onmousemove = (e)=> {
        cont.scrollTop = Math.max(0, Math.min(cont.scrollHeight, initScroll - (e.touches[0].pageX - mouse.x)));
      };

      var onmouseup = (e)=> {
        document.removeEventListener('touchend', onmouseup);
        document.removeEventListener('touchmove', onmousemove);
      };

      µ('ref-div', card).forEach(ref=> {
        ref.onready = ()=> {
          µ('input[type="text"],input[type="password"]', ref).forEach(inputSetup);

          µ('.cancel', ref)[0].onclick = (e)=> {
            e.stopPropagation();
            µ('#cards').close();
          };

          var up = µ('.jogUp', card)[0];
          var down = µ('.jogDown', card)[0];

          var onPress = (e)=> {
            if (e.target.className.includes('Down')) driver.ramp(-1);
            else driver.ramp(1);
          };

          var onRelease = (e)=> {
            e.preventDefault();
            driver.ramp(0, 200);
          };

          up.addEventListener('touchstart', onPress);
          up.addEventListener('touchend', onRelease);

          down.addEventListener('touchstart', onPress);
          down.addEventListener('touchend', onRelease);
        };
      });
    });

    µ('#static').onFocused = ()=> {
      µ('#mainMenu').title = 'Static Loading';
    };

    µ('#dynamic').onFocused = ()=> {
      µ('#mainMenu').title = 'Measure Dynamic Load';
    };

    µ('#cards').close = ()=> {
      µ('#dynamic').focused = false;
      µ('#static').focused = false;
      µ('#static').blurred = false;
      µ('#dynamic').blurred = false;
      µ('#close').style.opacity = 0;
      µ('body')[0].classList.remove('dynamic');
      µ('body')[0].classList.remove('static');
      µ('#keyboardDiv').classList.remove('show');
      µ('#numpadDiv').classList.remove('show');
    };

    µ('#close').onclick = µ('#cards').close;
  };
});
