import Tabs from 'Components/tabs/tabs.js';
import CarouselTab from 'Components/carousel/carousel-tab.js';

const tabs = document.querySelector('#tabs-poject');
const arrCarousel = document.querySelectorAll('.carousel');

const tabsPoject = new Tabs(tabs);

tabsPoject.init();
arrCarousel.forEach((item) => {
  new CarouselTab(item).init();
});
