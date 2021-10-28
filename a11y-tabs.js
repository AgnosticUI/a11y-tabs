/**
 * Tabs — a lightweight JavaScript package to facilitate a11y-compliant tabbed interfaces
 */
export default class Tabs {
  tabs = [];
  tabItems = null;
  panels = null;
  currentIndex = -1;
  isVerticalOrientation = false;

  /**
   *
   * @param {string} tabListSelector A CSS selector to pointing to your tablist — the parent element to your tab buttons
   * which must have attribute `[role="tablist"]` as we will combine this selector to find all its child tab buttons with
   * `role="tab"`. So your tab buttons must all have the `[role="tab"]` attributes. These should also contain `aria-controls`
   * attribute pointing to the ID of corresponding tab-panel. For example:
   *   `<div role="tablist"><button class="tab-item tab-button" role="tab" aria-controls="panel-1">Tab 1</button>...and so on`
   * @param {string} panelsSelector A CSS selector to find by `querySelectorAll`, your panel items. This selector
   * must be able to find all panels with role="tabpanel" items that correspond to your tab button's `aria-controls` IDs:
   *   ```js
   *   <div id="panel-1" role="tabpanel" tab-title="Tab 1">
   *     <div>Tab 1 content.</div>
   *   </div>
   *   ```
   * @param {number} activeIndex The index of the initial tab you'd like opened. Defaults to 0.
   */
  constructor(tabListSelector, panelsSelector, activeIndex) {
    const initialActiveIndex = activeIndex || 0;
    this.tabItems = document.querySelectorAll(`${tabListSelector} [role="tab"]`);
    this.panels = document.querySelectorAll(panelsSelector);
    const tablist = document.querySelector(tabListSelector);
    const orientation = tablist.getAttribute('aria-orientation');
    this.isVerticalOrientation = orientation && orientation === 'vertical' ? true : false;
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

  decrementIndex() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.tabItems.length - 1;
    }
  }

  incrementIndex() {
    this.currentIndex++;
    if (this.currentIndex >= this.tabItems.length) {
      this.currentIndex = 0;
    }
  }

  /**
   * This is used to implement our a11y keyboard navigation.
   *
   * @param {Event} ev fires when the user presses a key
   * @returns
   */
  handleKeydown(ev) {
    switch (ev.key) {
      case 'Up': // IE Edge
      case 'ArrowUp':
        // If orientation vertical update current index else "fall-through" so default return
        if (this.isVerticalOrientation) {
          this.decrementIndex();
          break;
        }
      case 'Down': // IE Edge
      case 'ArrowDown':
        // If orientation vertical update current index else "fall-through" so default return
        if (this.isVerticalOrientation) {
          this.incrementIndex();
          break;
        }
      case 'Left': // IE Edge
      case 'ArrowLeft':
        // If orientation horizontal update current index else "fall-through" so default return
        if (!this.isVerticalOrientation) {
          this.decrementIndex();
          break;
        }
      case 'Right': // IE Edge
      case 'ArrowRight':
        // If orientation horizontal update current index else "fall-through" so default return
        if (!this.isVerticalOrientation) {
          this.incrementIndex();
          break;
        }
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
        // If an unaccounted for key is pressed returning here prevents the
        // `preventDefault` below (thus preserving normal behavior)
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
