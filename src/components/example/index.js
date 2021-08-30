import Example from './example';
import Tablist from './tablist';

const elem = document.querySelector('#example-tabs');
const exampleTabs = new Example(elem);

const tablist = new Tablist('tablist');

export { exampleTabs, tablist };
