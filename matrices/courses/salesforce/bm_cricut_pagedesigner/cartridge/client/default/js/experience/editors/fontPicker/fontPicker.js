'use strict';

(() => {
    const variables = require('pd/variables');
    var rootEditorElement;

    /**
     * Generate font selections
     * @param {object} fonts the font variables
     * @returns {HTML} markup that is rendered
     */
    function generateFontHTML(fonts) {
        let fontOptionsHtml = `   <option value="" hidden>Select a font</option>`;
        for(const key in fonts) {
            let fontData = fonts[key];
            fontOptionsHtml += `<option value="${fontData.variable ? fontData.variable : 'default' }" class="pd-font-option ${fontData.variable}">${fontData.name}</option>`;
        }
        return fontOptionsHtml;
    };

    /**
     * initializes the base markup before page is ready. This is not part of the API, and called explicitely at the end of this module.
     */
    function init() {
        rootEditorElement = document.createElement('div');
        rootEditorElement.innerHTML = `<select id="pd-font-selectbox" data-selected="">`
        + generateFontHTML(variables.brandFonts) +
        `</select>`;

        document.body.appendChild(rootEditorElement);
    };

    /** the page designer signals readiness to show this editor and provides an optionally pre selected value */
    listen('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;

        rootEditorElement.querySelector('#pd-font-selectbox').addEventListener('change', function (event) {
            const selectedValue = event.target.value;
            let selectedElement = event.target.querySelector(`option[value=${selectedValue}]`);
            selectedElement.selected = true;
            let fontName = selectedElement.innerHTML;
            emit({
                type: 'sfcc:interacted'
            });
            emit({
                type: 'sfcc:value',
                payload: selectedValue ? { value: selectedValue } : null
            });
        });

        if (selectedValue) {
            let selectedElement = rootEditorElement.querySelector(`option[value=${selectedValue}]`);
            selectedElement.selected = true;
            rootEditorElement.querySelector('#pd-font-selectbox').value = selectedValue;
        }

    });
    // When a value was selected
    listen('sfcc:value', value => { });
    // When the editor must require the user to select something
    listen('sfcc:required', value => { });
    // When the editor is asked to disable its controls
    listen('sfcc:disabled', value => { });

    init();

})();
