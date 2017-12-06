var obtains = [
  `µ/components`,
  `${__dirname}/static`,
  `${__dirname}/dynamic`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, Static, Dynamic)=> {

  exports.setup = ()=> {

    µ('#cards').onLoad = ()=> {
      µ('#static').makeTransitionState('blurred');
      µ('#dynamic').makeTransitionState('blurred');

      µ('#static').onclick = ()=> {
        µ('#static').focused = true;
        µ('#dynamic').blurred = true;
        µ('#close').style.opacity = 1;
        µ('body')[0].classList.add('static');
      };

      µ('#static').onFocused = ()=> {
        µ('#mainMenu').title = 'Static Loading';
      };

      µ('#static').onLoseFocused = ()=> {
        µ('#mainMenu').title = µ('#mainMenu').originalTitle;
      };

      µ('#dynamic').onFocused = ()=> {
        µ('#mainMenu').title = 'Measure Dynamic Load';
      };

      µ('#dynamic').onLoseFocused = ()=> {
        µ('#mainMenu').title = µ('#mainMenu').originalTitle;
      };

      µ('#dynamic').onclick = ()=> {
        µ('#dynamic').focused = true;
        µ('#static').blurred = true;
        µ('#close').style.opacity = 1;
        µ('body')[0].classList.add('dynamic');
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
  };
});
