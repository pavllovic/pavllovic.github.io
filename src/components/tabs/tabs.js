import { KeysActions, getActionFromKey } from 'Lib/keyActions/KeysActions.js';
import * as lib from 'Lib/tabs/tabs.js';

const Tabs = lib.tabs;

Tabs.prototype = {
  constructor: Tabs,
  setListeners: lib.setListeners,
  deactivatePanel: lib.deactivatePanel,
  activatePanel: lib.activatePanel,
  deactivateTab: lib.deactivateTab,
  activateTab: lib.activateTab,
  handleEvent: lib.handleEvent,
  init() {
    lib.init.call(this);
    this.tabCount = this.tabs.querySelector('.count--list');
  },
  unfocusTab(tab) {
    lib.unfocusTab.call(this, tab);
    if(this.prevTab) this.prevTab.classList.remove('is-focus_prev');
    if(this.nextTab) this.nextTab.classList.remove('is-focus_next');
  },
  focusTab(tab) {
    lib.focusTab.call(this, tab);
    this.prevTab = tab.previousElementSibling;
    this.nextTab = tab.nextElementSibling;
    if(this.prevTab) this.prevTab.classList.add('is-focus_prev');
    if(this.nextTab) this.nextTab.classList.add('is-focus_next');
    tab.focus();
  },
  translateTablist(tab) {
    const count = tab.getAttribute('data-tab');
    const width = tab.offsetWidth;
    this.tablist.style.transform = `translateX(calc(${width * (count - 1)} * -1px)`;
  },
  translateTabCount(tab) {
    const count = parseInt(tab.getAttribute('data-tab'), 10);
    this.tabCount.style.transform = `translateY(calc(-100% * ${count}))`;
  },
  changeColors(tab) {
    const color = tab.getAttribute('data-color');
    const bg = tab.getAttribute('data-bg');
    document.body.style.setProperty('--txt-color', color);
    document.body.style.setProperty('--bg-color', bg);
  },
  onclickTab(tab) {
    lib.onclickTab.call(this, tab);
    this.translateTablist(tab);
    this.changeColors(tab);
    this.translateTabCount(tab);
    tab.focus();
  },
  onkeydown(e) {
    const action = getActionFromKey(e, true);

    switch(action) {
      case KeysActions.Left:
        e.preventDefault();
        const prevTab = this.focusedTab.previousElementSibling;
        if(prevTab) this.onclickTab(prevTab);
        break;
      case KeysActions.Right:
        e.preventDefault();
        const nextTab = this.focusedTab.nextElementSibling;
        if(nextTab) this.onclickTab(nextTab);
        break;
      // case KeysActions.Space:
      // case KeysActions.CloseSelect:
      //   e.preventDefault();
      //   return this.onclickTab(this.focusedTab);
      case KeysActions.Close:
        if(this.activeTablist) {
          this.deactivatePanel(this.activePanel);
          this.deactivateTablist();
        }
        break;
      case KeysActions.First:
        e.preventDefault();
        return this.focusTab(this.tablist.firstElementChild);
      case KeysActions.Last:
        e.preventDefault();
        return this.focusTab(this.tablist.lastElementChild);
      default:
        break;
    }
    return undefined;
  },
};

export default Tabs;
