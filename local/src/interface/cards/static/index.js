var obtains = [
  `µ/components`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu })=> {

  var importDoc = document.currentScript.ownerDocument;
  importDoc.onReady = function () {
    console.log('Static');
    µ('#staticCancel').onclick = (e)=> {
      e.stopPropagation();
      µ('#cards').close();
    };

    µ('input', importDoc.refDiv).forEach(inputSetup);
  };
});
