var obtains = [
  '../piFig/src/wifi.js',
];

obtain(obtains, (wifi)=> {
  if (!customElements.get('wifi-config')) {
    class wifiConfig extends HTMLElement {
      constructor() {
        super();

        console.log('Container id is ' + this.id);
      }

      connectedCallback() {
        var _this = this;

        this.ssidSelect = µ('+select', _this);
        this.password = µ('+input', _this);
        //register events, check contents, etc.

      };
    }

    customElements.define('wifi-config', menuBar);
  }

  exports.WifiConfig = customElements.get('wifi-config');
});
