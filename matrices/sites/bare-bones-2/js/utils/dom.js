/**
 * Toggles class on element passed in
 * @param {*} el 
 * Element to be toggled
 * @param {string} cssClass 
 * CSS Class to be toggled
 */
export function toggle(el, cssClass) {
    el.classList.toggle(cssClass);
}

/**
 * Checks if element has class applied to it
 * @param {*} el 
 * Element to be checked
 * @param {string} cssClass 
 * CSS Class to be checked
 */
export function hasClass(el, cssClass) {
    return el.classList.contains(cssClass);
}