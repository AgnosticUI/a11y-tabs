# [A11y Tabs](https://github.com/AgnosticUI/a11y-tabs)

A lightweight (<1Kb) JavaScript package to facilitate a11y-compliant tabbed interfaces.

- [Demo on Codepen↗](https://codepen.io/roblevin/pen/qBXmvoL)
- Documentation (coming soon)

**Features:**

- Support for keyboard navigation `home`, `end`, `left`, `right`, `enter`, and `space`
- Proper use of `aria-*` attributes applied
- Circular navigation and proper `tab` and arrow navigation focus
- Lightweight (< 1Kb) 
- Tested
- Available as esm and umd
- Supports `prefers reduced motion` system preference

**Unavailble features:**

- `aria-orientation` vertical with up, down arrow support (coming soon!)
- This implementation uses the manual activation pattern which requires the user to click or press enter / space on a focused tab button to open its corresponding panel (as opposed to the [selection follow focus](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus) or automatic activation patterns)

## Credits & Inspiration

A heartfelt thank you to [@KittyGiraudel](https://github.com/KittyGiraudel) for creating [a11y-dialog](https://github.com/KittyGiraudel/a11y-dialog) which inspired me to create a kindred-spirited and hopefully, eventually, comparable `a11y-tabs`.

I was also inspired by the [WAI-ARIA practices](https://www.w3.org/TR/wai-aria-practices-1.1/#intro) resources, and [MDN tab role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role) documentation efforts. Both resources certainly provided helpful and prescriptive guidance for this project.
