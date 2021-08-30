import { tab, tabMethod } from 'Lib/components/tab/tab.js';

const Example = tab;

Example.prototype = {
  constructor: Example,
  init: tabMethod.init,
  nextTab: tabMethod.nextTab,
  prevTab: tabMethod.prevTab,
  switchFocus: tabMethod.switchFocus,
  switchSelec: tabMethod.switchSelec,
  focusStart: tabMethod.focusStart,
  focusEnd: tabMethod.focusEnd,
  showPanel: tabMethod.showPanel,
  onKeydown: tabMethod.onKeydown,
  destroy: tabMethod.destroy,
  handleEvent: tabMethod.handleEvent,
};

export default Example;
