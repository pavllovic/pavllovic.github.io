import { KeysActions, getActionFromKey } from 'Lib/keyActions/KeysActions.js';
import * as lib from 'Lib/carousel-tab/carousel-tab.js';

const CarouselTab = lib.carouselTab;

CarouselTab.prototype = {
  constructor: CarouselTab,
  setListeners: lib.setListeners,
  focusTab: lib.focusTab,
  unfocusTab: lib.unfocusTab,
  activateTab: lib.activateTab,
  deactivateTab: lib.deactivateTab,
  onclickTab(tab) {
    this.changeSlide(tab);
    this.focusTab(tab);
    this.activateTab(tab);
  },
  init() {
    this.setListeners();
    this.focusTab(this.tabList.firstElementChild);
    this.activateTab(this.tabList.firstElementChild);
    this.activateSlide(this.slideList.firstElementChild, 1);
    this.projects = document.querySelector('.tabs--tablist');
    this.heading = this.carousel.previousElementSibling;
    this.carouselId = this.carousel.getAttribute('id');
    this.state = false;
  },
  changeSlide(tab) {
    const id = tab.getAttribute('data-tab');
    const slide = this.slideList.querySelector(`#slide-${this.carouselId}-${id}`);
    this.activateSlide(slide, id);
  },
  activateSlide(slide, id) {
    if(this.activeSlide) this.deactivateSlide(id);
    const animation = id < this.focusTabIndex ? 'from-top' : 'from-bottom';
    this.activeSlide = slide;
    this.activeSlide.style = `animation-name: ${animation}`;
    this.focusTabIndex = id;
  },
  deactivateSlide(id) {
    const animation = id > this.focusTabIndex ? 'to-top' : 'to-bottom';
    this.activeSlide.style = `animation-name: ${animation}`;
  },
  onkeydown(e) {
    const action = getActionFromKey(e, true);
    switch(action) {
      case KeysActions.Left:
        e.preventDefault();
        if(this.focusedTab.previousElementSibling) {
          return this.onclickTab(this.focusedTab.previousElementSibling);
        }
        break;
      case KeysActions.Right:
        e.preventDefault();
        if(this.focusedTab.nextElementSibling) {
          return this.onclickTab(this.focusedTab.nextElementSibling);
        }
        break;
      case KeysActions.Close:
        const btn = this.carousel.querySelector('[aria-pressed="false"][data-carousel="btn"]');
        this.focusTab(this.tabList.firstElementChild);
        return this.toggleStateCarousel(btn);
      default:
        break;
    }
    return undefined;
  },
  toggleStateCarousel(btn) {
    this.slideList.removeAttribute('style');
    this.state ? this.hideCarousel() : this.showCarousel();
    this.projects.classList.toggle('is-hide');
    this.heading.classList.toggle('is-hide');
    this.toggleStateBtn(btn);
    this.state = !this.state;
  },
  hideCarousel() {
    this.carousel.classList.add('is-hide');
    this.carousel.classList.remove('is-show');
  },
  showCarousel() {
    this.carousel.classList.add('is-show');
    this.carousel.classList.remove('is-hide');
  },
  toggleStateBtn(btn) {
    const ctrl = this.carousel.querySelector('[aria-pressed="true"][data-carousel="btn"]');
    ctrl.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-pressed', 'true');
    ctrl.focus();
  },
  handleEvent(e) {
    switch(e.type) {
      case 'click':
        e.stopPropagation();
        const type = e.target.getAttribute('data-carousel');
        if(type === 'btn') return this.toggleStateCarousel(e.target);
        const role = e.target.getAttribute('role');
        if(role === 'tab') return this.onclickTab(e.target);
        break;
      case 'keydown':
        e.stopPropagation();
        this.onkeydown(e);
        break;
      default:
        break;
    }
    return undefined;
  },
};

export default CarouselTab;
