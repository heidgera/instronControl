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

    µ('#jogUpDynamic').onmousedown = (e)=> {
      driver.forward(.5);
    };

    µ('#jogUpDynamic').onmouseup = (e)=> {
      driver.stop();
    };

    µ('#jogDownDynamic').onmousedown = (e)=> {
      driver.backward(.5);
    };

    µ('#jogDownDynamic').onmouseup = (e)=> {
      driver.stop();
    };

    µ('input', importDoc.refDiv).forEach(inputSetup);
  };
});
