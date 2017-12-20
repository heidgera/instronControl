var process = require('electron').remote.process;

var obtains = [
  `µ/components`,
  `./src/backend/${process.platform == 'darwin' ? 'dummy.js' : ''}`,
];

obtain(obtains, ({ Button, Card, Dropdown, Menu }, { driver }, { Import })=> {

  Import.onready = ()=> {

  };
});
