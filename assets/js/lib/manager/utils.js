/**
 * Returns a list of focussable elements. If no `parentEl` is provided, the list will include all focusable elements in the document.
 * @param {HTMLElement=} parentEl
 * @link https://zellwk.com/blog/keyboard-focusable-elements/ source
 * @returns [HTMLElement]
 */
export const getKeyboardFocussableElements = (parentEl) =>
  (parentEl ? parentEl : document).querySelectorAll(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );

export const getFirstAndLast = (elements) => {
  const first = elements[0];
  const last = elements[elements.length - 1];
  return { first, last };
};
