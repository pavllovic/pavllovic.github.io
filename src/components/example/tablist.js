import { nav, navMethods } from 'Lib/components/nav/nav.js';

const Tablist = nav;

Tablist.prototype = {
  constructor: Tablist,
  init: function() {
    this.menu.addEventListener('click', this);
    navMethods.init.call(this);
  },
  openMenu: navMethods.openMenu,
  closeMenu: navMethods.closeMenu,
  toogleMenu: navMethods.toogleMenu,
  destroy: navMethods.destroy,
  handleEvent: function(e) { // eslint-disable-line
    switch(e.type) {
      case 'click':
        if(e.target.getAttribute('role') === 'tab') {
          return this.toogleMenu();
        }
        break;
      default:
        break;
    }
    navMethods.handleEvent.call(this, e);
  },
};

export default Tablist;
