if (!customElements.get('menu-bar')) {
  class menuBar extends HTMLElement {
    constructor() {
      super();

      console.log('Container id is ' + this.id);
    }

    connectedCallback() {
      //register events, check contents, etc.

    };
  }

  customElements.define('menu-bar', menuBar);
}

exports.MenuBar = customElements.get('menu-bar');
