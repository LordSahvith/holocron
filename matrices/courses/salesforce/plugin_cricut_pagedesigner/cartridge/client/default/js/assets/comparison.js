'use strict';

/**
 * Toggle Machines from selection
 */
function toggleMachines() {
    let dropdown1 = $('[data-dropdown="dropdown1"');
    let dropdown2 = $('[data-dropdown="dropdown2"');
    let dropdownValues = [dropdown1.val(), dropdown2.val()];
    let rows = $('.row').splice(1);

    rows.forEach(row => {
        let $secondCol = $(row.querySelector(`[data-machine="${dropdownValues[1]}"]`));
        $secondCol.show();
        $(row).prepend($secondCol);

        let $firstCol = $(row.querySelector(`[data-machine="${dropdownValues[0]}"]`));
        $firstCol.show();
        $(row).prepend($firstCol);

        $(row).children().last().hide();
    });
}

/**
 * setup event listeners for dropdowns
 */
function createEventListeners() {
    let dropdowns = document.querySelectorAll('.comparison .dropdown select');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function () {
            toggleMachines();
        });
    });
}

$(document).ready(function () {
    toggleMachines();
    createEventListeners();
});
