import { KeysActions, getActionFromKey } from 'Lib/keyActions/KeysActions.js';

export function tabs(elem) {
  this.tabs = elem;
  this.tablist = this.tabs.querySelector('[role="tablist"]');
  this.panellist = this.tabs.querySelector('[data-tabs="panellist"]');
}

export function init() {
  this.setListeners();
  this.focusTab(this.tablist.firstElementChild);
  this.activateTab(this.tablist.firstElementChild);
  this.activatePanel(this.panellist.firstElementChild);
}

export function setListeners() {
  this.tabs.addEventListener('click', this);
  this.tabs.addEventListener('keydown', this);
}

export function unfocusTab(tab) {
  tab.classList.remove('is-focus');
}

export function focusTab(tab) {
  if(this.focusedTab) this.unfocusTab(this.focusedTab);
  tab.classList.add('is-focus');
  this.focusedTab = tab;
}

export function deactivateTab(tab) {
  tab.setAttribute('tabindex', '-1');
  tab.setAttribute('aria-selected', false);
}

export function activateTab(tab) {
  if(this.activeTab) this.deactivateTab(this.activeTab);
  tab.setAttribute('tabindex', '0');
  tab.setAttribute('aria-selected', true);
  this.activeTab = tab;
}

export function deactivatePanel(panel) {
  panel.classList.remove('is-active');
}

export function activatePanel(panel) {
  if(this.activePanel) this.deactivatePanel(this.activePanel);
  panel.classList.add('is-active');
  this.activePanel = panel;
}

export function onclickTab(tab) {
  const id = tab.getAttribute('aria-controls');
  this.activatePanel(this.tabs.querySelector(`#${id}`));
  this.activateTab(tab);
  this.focusTab(tab);
}

export function onkeydown(e) {
  const action = getActionFromKey(e, true);

  switch(action) {
    case KeysActions.Left:
      e.preventDefault();
      if(this.focusedTab.previousElementSibling) {
        return this.focusTab(this.focusedTab.previousElementSibling);
        // return this.onclickTab(this.focusedTab.previousElementSibling);
      }
      break;
    case KeysActions.Right:
      e.preventDefault();
      if(this.focusedTab.nextElementSibling) {
        return this.focusTab(this.focusedTab.nextElementSibling);
        // return this.onclickTab(this.focusedTab.nextElementSibling);
      }
      break;
    case KeysActions.Space:
    case KeysActions.CloseSelect:
      e.preventDefault();
      return this.onclickTab(this.focusedTab);
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
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      e.stopPropagation();
      const role = e.target.getAttribute('role');
      if(role === 'tab') return this.onclickTab(e.target);
      break;
    case 'keydown':
      this.onkeydown(e);
      break;
    default:
      break;
  }
  return undefined;
}
