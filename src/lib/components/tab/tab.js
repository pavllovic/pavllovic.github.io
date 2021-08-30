const tab = function(elem) {
  this.wrap = elem;
  this.tablist = elem.querySelector('[role="tablist"]');
  this.focusedTab = this.tablist.querySelector('[role="tab"]');
  this.selectedTab = this.focusedTab;
};

const tabMethod = {
  init: function() {
    this.tablist.addEventListener('keydown', this);
    this.tablist.addEventListener('click', this);
    this.selectedTab.setAttribute('tabindex', '0');
    this.selectedTab.setAttribute('aria-selected', 'true');
    this.wrap.querySelector('[role="tabpanel"]').classList.add('is-active');
  },

  nextTab: function() {
    const next = this.focusedTab.nextElementSibling;
    if(next) this.switchFocus(next);
  },

  prevTab: function() {
    const prev = this.focusedTab.previousElementSibling;
    if(prev) this.switchFocus(prev);
  },

  switchFocus: function(elem) {
    elem.focus();
    this.focusedTab = elem;
  },

  switchSelec: function(elem) {
    this.selectedTab.setAttribute('tabindex', '-1');
    this.selectedTab.setAttribute('aria-selected', 'false');
    elem.setAttribute('tabindex', '0');
    elem.setAttribute('aria-selected', 'true');
    this.selectedTab = elem;
  },

  focusStart: function() {
    const firstElem = this.tablist.firstElementChild;
    this.switchFocus(firstElem);
  },

  focusEnd: function() {
    const lastElem = this.tablist.lastElementChild;
    this.switchFocus(lastElem);
  },

  showPanel: function(elem) {
    if(elem === this.selectedTab) return;
    const prev = this.selectedTab.getAttribute('aria-controls');
    const id = elem.getAttribute('aria-controls');
    this.wrap.querySelector(`#${prev}`).classList.remove('is-active');
    this.wrap.querySelector(`#${id}`).classList.add('is-active');
    this.switchSelec(elem);
  },

  onKeydown: function(e) {
    switch(e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        return this.nextTab();
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        return this.prevTab();
      case 'Home':
        e.preventDefault();
        return this.focusStart();
      case 'End':
        e.preventDefault();
        return this.focusEnd();
      case 'Space':
        return this.showPanel(e.target);
      default:
        break;
    }
    return undefined;
  },

  destroy: function() {
    this.tablist.removeEventListener('keydown', this);
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'keydown':
        return this.onKeydown(e);
      case 'click':
        if(e.target.getAttribute('role') === 'tab') {
          return this.showPanel(e.target);
        }
        break;
      default:
        break;
    }
    return undefined;
  },
};

export { tab, tabMethod };
