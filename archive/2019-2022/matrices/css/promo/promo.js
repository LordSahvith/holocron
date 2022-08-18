(function ($) {
    $(document).ready(function () {
        var toggle = $('#international-toggle');
        var info = $('#international-information');
        $('#international-toggle').on('click', function () {
            info.slideToggle(200);
            if (!toggle.hasClass('rotate')) {
                toggle.addClass('rotate');
            } else {
                toggle.removeClass('rotate');
            }
        });
    });
})(jQuery);