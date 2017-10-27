
obtain([], ()=> {
  if (!customElements.get('but-ton')) {
    window.loadCSS(__dirname + '/button.css');

    class Button extends HTMLElement {
      constructor() {
        super();

        console.log('Container id is ' + this.id);
      }

      get disabled() {
        return (µ('|>disabled', this) == '');
      }

      set disabled(val) {
        if (val) this.setAttribute('disabled', '');
        else this.removeAttribute('disabled');
      }

      connectedCallback() {
        //register events, check contents, etc.
        var _this = this;

        _this.onPress = ()=> { console.log('pressed button');};

        _this.onmousedown = (e)=> {
          e.preventDefault();
          _this.pressed = true;
        };

        document.addEventListener('mouseup', (e)=> {
          e.preventDefault();
          _this.pressed = false;
        });

        _this.onmouseup = (e)=> {
          e.preventDefault();
          if (_this.pressed && !_this.disabled) _this.onPress();
        };
      };
    }

    customElements.define('but-ton', Button);
  }

  exports.Button = customElements.get('but-ton');
});
