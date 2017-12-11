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

    var onUpDown = (e)=> {
      driver.forward(.5);
    };

    var onDownDown = (e)=> {
      driver.backward(.5);
    };

    µ('#jogUpDynamic').addEventListener('mousedown', onUpDown);
    µ('#jogUpDynamic').addEventListener('touchstart', onUpDown);
    µ('#jogUpDynamic').addEventListener('touchend', driver.stop);
    µ('#jogUpDynamic').addEventListener('mouseup', driver.stop);

    µ('#jogDownDynamic').addEventListener('mousedown', onDownDown);
    µ('#jogDownDynamic').addEventListener('touchstart', onDownDown);
    µ('#jogDownDynamic').addEventListener('touchend', driver.stop);
    µ('#jogDownDynamic').addEventListener('mouseup', driver.stop);

    µ('input', importDoc.refDiv).forEach(inputSetup);
  };
});
