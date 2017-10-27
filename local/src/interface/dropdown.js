obtain([], ()=> {
  if (!customElements.get('drop-down')) {
    if (__dirname) window.loadCSS(__dirname + '/dropdown.css');
    else window.loadCSS(exports.src.substr(0, exports.src.lastIndexOf('/')) + '/dropdown.css');

    class Dropdown extends HTMLSelectElement {
      constructor() {
        super();

        console.log('Y no u work?');
      }

      addOption (text, value) {
        var newOpt = µ('+option', this);
        newOpt.value = value;
        newOpt.textContent = text;
        return newOpt;
      }

      removeOption (opts) {
        // remove child code here.
      }

      connectedCallback() {
        //register events, check contents, etc.
        var _this = this;

        _this.onSelect = (which)=> { console.log(`${which} was chosen`);};

        _this.onchange = ()=> {
          _this.onSelect(_this.value);
        };

      };
    }

    customElements.define('drop-down', Dropdown, { extends: 'select' });
  }

  exports.Button = customElements.get('drop-down');
});
