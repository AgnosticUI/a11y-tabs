/**
 * Tabs — a lightweight JavaScript package to facilitate a11y-compliant tabbed interfaces
 */
export default class Tabs {
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
    constructor(tabListSelector: string, panelsSelector: string, activeIndex: number);
    tabs: any[];
    tabItems: any;
    panels: any;
    currentIndex: number;
    isVerticalOrientation: boolean;
    /**
     * Sets the selected tab and delegates to `activatePanel` to, ultimately, select a new
     * tab / tab panel pair that is selected aka expanded.
     *
     * @param {HTMLElement} tabElement the tab button element to select
     */
    selectTab(tabElement: HTMLElement): void;
    /**
     * Used to remove .active class from all tabs, set to tabindex -1, and aria-selected false.
     */
    deselectTabs(): void;
    /**
     * Essentially, will set all tab panels to hidden, aria-expanded false, and tabindex 0 (so they can be tabbed into)
     */
    resetPanels(): void;
    /**
     *
     * @param {Event} ev fired when user clicks or presses <space | enter> on a tab button
     */
    handleClick(ev: Event): void;
    /**
     * This is used to implement our a11y keyboard navigation.
     *
     * @param {Event} ev fires when the user presses a key
     * @returns
     */
    handleKeydown(ev: Event): void;
    /**
     * Only ran once from our contructor this sets up the tabs, panels, and adds click and keydown listeners
     */
    initTabs(): void;
    /**
     * Activates a panel by removing it's hidden attribute and setting aria-expanded to true
     * @param {string} panelId a tab panel's ID obtained from the `aria-controls` attribute
     */
    activatePanel(panelId: string): void;
    _selectTab(tabElement: any): void;
    decrementIndex(): void;
    incrementIndex(): void;
}
