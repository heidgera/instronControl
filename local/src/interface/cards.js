
obtain([], ()=> {
  if (!customElements.get('but-ton')) {
    var dir = '';
    if (__dirname) dir = __dirname;
    else dir = exports.src.substr(0, exports.src.lastIndexOf('/'));

    //window.loadCSS(__dirname + '/button.css');

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

        this.root = _this.attachShadow({ mode: 'open' });

        this.root.innerHTML = `<style> @import "${dir}/cards.css";</style>`;

        _this.display = µ('+slot', _this.root);

        _this.onPress = ()=> { console.log('pressed button');};
      };
    }

    customElements.define('but-ton', Button);
  }

  exports.Button = customElements.get('but-ton');
});
