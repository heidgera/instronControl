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
      if (e.target.id.includes('Down')) driver.ramp(-1);
      else driver.ramp(1);
    };

    var onRelease = (e)=> {
      //console.log(e);
      e.preventDefault();
      driver.ramp(0, 200);
    };

    //µ('#jogUpDynamic').addEventListener('mousedown', onPress);
    µ('#jogUpDynamic').addEventListener('touchstart', onPress);
    µ('#jogUpDynamic').addEventListener('touchend', onRelease);

    //µ('#jogDownDynamic').addEventListener('mousedown', onPress);
    µ('#jogDownDynamic').addEventListener('touchstart', onPress);
    µ('#jogDownDynamic').addEventListener('touchend', onRelease);

    µ('input', importDoc.refDiv).forEach(inputSetup);
  };
});
