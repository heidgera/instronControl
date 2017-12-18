var obtains = [
  `µ/components`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { Import })=> {

  Import.onready = ()=> {
    console.log('Static');

  };
});
