var obtains = [
  `µ/components`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu })=> {

  //exports.setup = ()=> {};

  var importDoc = document.currentScript.ownerDocument;

  importDoc.onReady = ()=> {

    µ('#dynamicCancel').onclick = (e)=> {
      e.stopPropagation();
      µ('#cards').close();
    };

    µ('input', importDoc.refDiv).forEach(inputSetup);
  };
});
