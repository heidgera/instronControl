var obtains = [
  `µ/components`,
  './src/backend',
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { driver })=> {

  //exports.setup = ()=> {};

  var importDoc = document.currentScript.ownerDocument;

  importDoc.onReady = ()=> {

    µ('#dynamicCancel').onclick = (e)=> {
      e.stopPropagation();
      µ('#cards').close();
    };

    var onPress = (e)=> {
      //console.log(e);
      //e.preventDefault();
      if (e.target.id.includes('Down')) driver.backward(.5);
      else driver.forward(.5);
    };

    var onRelease = (e)=> {
      //console.log(e);
      e.preventDefault();
      driver.stop();
    };

    //µ('#jogUpDynamic').addEventListener('mousedown', onPress);
    µ('#jogUpDynamic').addEventListener('touchstart', onPress);
    µ('#jogUpDynamic').addEventListener('touchend', onRelease);

    //µ('#jogDownDynamic').addEventListener('mousedown', onPress);
    µ('#jogDownDynamic').addEventListener('touchstart', onPress);
    µ('#jogDownDynamic').addEventListener('touchend', onRelease);

    /*var onUpDown = (e)=> {
      console.log('mouse down');
      driver.forward(.5);
    };

    var onDownDown = (e)=> {
      console.log('mouse down');
      driver.backward(.5);
    };

    µ('#jogUpDynamic').addEventListener('mousedown', onUpDown);
    µ('#jogUpDynamic').addEventListener('touchstart', onUpDown);
    µ('#jogUpDynamic').addEventListener('touchend', (e)=> {
      e.preventDefault();
      driver.stop();
    });
    µ('#jogUpDynamic').addEventListener('click', driver.stop);

    µ('#jogDownDynamic').addEventListener('mousedown', onDownDown);
    µ('#jogDownDynamic').addEventListener('touchstart', onDownDown);
    µ('#jogDownDynamic').addEventListener('touchend', (e)=> {
      e.preventDefault();
      console.log('touch stop');
      driver.stop();
    });
    µ('#jogDownDynamic').addEventListener('click', driver.stop);*/

    µ('input', importDoc.refDiv).forEach(inputSetup);
  };
});
