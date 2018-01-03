var obtains = [
  `µ/components`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { Import })=> {
  Import.onready = ()=> {
    var ov = Import.refDiv;

    ov.onCancel = ()=> {};

    ov.setProgress = (perc)=> {
      µ('.progress', ov).style.width = perc + '%';
    };

    Object.defineProperty(ov, 'show', {
      get: function () {
        return (µ(`|>show`, ov) == '');
      },

      set: function (val) {
        if (val) {
          ov.setAttribute('show', '');
        } else {
          ov.removeAttribute('show');
        }
      },
    });

    µ('but-ton.cancel', ov)[0].onclick = ()=> {
      ov.show = false;
      ov.onCancel();
    };
  };
});
