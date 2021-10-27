(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.A11yTabs = factory());
})(this, (function () { 'use strict';

  /**
   *   Tabs — a lightweight JavaScript package to facilitate a11y-compliant tabbed interfaces
   */
  class Tabs {
    tabs = [];
    tabItems = null;
    panels = null;
    currentIndex = -1;

    /**
     *
     * @param {string} tabsSelector A CSS selector to find by `querySelectorAll`, your tab items.
     * This selector must find all the tab buttons with role="tab". These should also contain `aria-controls`
     * attribute pointing to the ID of corresponding tab-panel. For example:
     *   `<button class="tab-item tab-button" role="tab" aria-controls="panel-1">Tab 1</button>`
     * @param {string} panelsSelector A CSS selector to find by `querySelectorAll`, your panel items. This selector
     * must be able to find all panels with role="tabpanel" items that correspond to your tab button's `aria-controls` IDs:
     *   ```js
     *   <div id="panel-1" role="tabpanel" tab-title="Tab 1">
     *     <div>Tab 1 content.</div>
     *   </div>
     *   ```
     * @param {number} activeIndex The index of the initial tab you'd like opened. Defaults to 0.
     */
    constructor(tabsSelector, panelsSelector, activeIndex) {
      const initialActiveIndex = activeIndex || 0;
      this.tabItems = document.querySelectorAll(tabsSelector);
      this.panels = document.querySelectorAll(panelsSelector);
      this.currentIndex = initialActiveIndex;
      this.selectTab = this.selectTab.bind(this);
      this.deselectTabs = this.deselectTabs.bind(this);
      this.resetPanels = this.resetPanels.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.initTabs();
    }

    /**
     * Only ran once from our contructor this sets up the tabs, panels, and adds click and keydown listeners
     */
    initTabs() {
      this.resetPanels();
      this.deselectTabs();
      for (let i = 0; i < this.tabItems.length; i++) {
        const tab = this.tabItems[i];
        this.tabs[i] = tab;
        this.tabs[i].index = i;
        tab.addEventListener('click', this.handleClick);
        tab.addEventListener('keydown', this.handleKeydown);
        if (i === this.currentIndex) {
          this._selectTab(tab);
        }
      }
    }

    /**
     * Activates a panel by removing it's hidden attribute and setting aria-expanded to true
     * @param {string} panelId a tab panel's ID obtained from the `aria-controls` attribute
     */
    activatePanel(panelId) {
      document.querySelector(`#${panelId}`).removeAttribute('hidden');
      document.querySelector(`#${panelId}`).setAttribute('aria-expanded', true);
    }

    /**
     * Used to remove .active class from all tabs, set to tabindex -1, and aria-selected false.
     */
    deselectTabs() {
      for (let i = 0; i < this.tabItems.length; i++) {
        const tab = this.tabItems[i];
        tab.classList.remove('active');
        tab.setAttribute('tabindex', '-1');
        tab.setAttribute('aria-selected', false);
      }
    }

    /**
     * Essentially, will set all tab panels to hidden, aria-expanded false, and tabindex 0 (so they can be tabbed into)
     */
    resetPanels() {
      for (let j = 0; j < this.panels.length; j++) {
        const panel = this.panels[j];
        panel.setAttribute('hidden', true);
        panel.setAttribute('aria-expanded', false);
        panel.setAttribute('tabindex', '0');
      }
    }

    /**
     * Sets the selected tab and delegates to `activatePanel` to, ultimately, select a new
     * tab / tab panel pair that is selected aka expanded.
     *
     * @param {HTMLElement} tabElement the tab button element to select
     */
    selectTab(tabElement) {
      this.deselectTabs();
      this.resetPanels();
      this._selectTab(tabElement);
    }

    _selectTab(tabElement) {
      tabElement.classList.add('active');
      tabElement.setAttribute('aria-selected', 'true');
      tabElement.removeAttribute('tabindex');
      this.activatePanel(tabElement.getAttribute('aria-controls'));
    }

    /**
     *
     * @param {Event} ev fired when user clicks or presses <space | enter> on a tab button
     */
    handleClick(ev) {
      this.selectTab(ev.target);
    }

    /**
     * This is used to implement our a11y keyboard navigation.
     *
     * @param {Event} ev fires when the user presses a key
     * @returns
     */
    handleKeydown(ev) {
      /**
       * TODO -- we will need to implement both orientation (e.g. vertical vs. horizontal tabs) and UP/DOWN
       */
      switch (ev.key) {
        case 'Left': // IE Edge
        case 'ArrowLeft':
          this.currentIndex--;
          if (this.currentIndex < 0) {
            this.currentIndex = this.tabItems.length - 1;
          }
          console.log('ci after LEFT: ', this.currentIndex);
          break;
        case 'Right': // IE Edge
        case 'ArrowRight':
          this.currentIndex++;
          if (this.currentIndex >= this.tabItems.length) {
            this.currentIndex = 0;
          }
          console.log('ci after RIGHT: ', this.currentIndex);
          break;
        case 'Home':
        case 'ArrowHome':
          this.currentIndex = 0;
          break;
        case 'End':
        case 'ArrowEnd':
          this.currentIndex = this.tabItems.length - 1;
          break;
        case 'Enter':
        case 'Space':
          this.selectTab(ev.target);
          ev.target.focus();
          break;
        default:
          // If another key pressed returning prevents the `preventDefault` below (thus preserving normal behavior)
          return;
      }
      ev.preventDefault();

      /**
       * Ensure we have proper focus on currently selected tab. We do
       * NOT want to set its tabindex yet though; that only happens when
       * we click, enter, or space on a tab button.
       */
      this.tabs[this.currentIndex].focus();
    }
  }

  return Tabs;

}));
