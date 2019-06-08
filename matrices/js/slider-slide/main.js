(function($) {
    $(document).ready(function() {
        var inWrap = $('.inner-wrapper');
        var slide = $('.slide');
        var inWrapLength = $('.slide').length;
        var inWrapWidth = inWrapLength * 100 + '%';

        inWrap.css('width', inWrapWidth);
        slide.css('width', 'calc(100% /' + inWrapLength + ')');

        $('.prev').on('click', function() {
            inWrap.animate({left: '0%'}, 300, function(){
                inWrap.css('left', '-100%');
                $('.slide').first().before($('.slide').last());
            });
        }); 
        
        inWrap.on('swiperight', function() {
            inWrap.animate({left: '0%'}, 300, function(){
                inWrap.css('left', '-100%');
                $('.slide').first().before($('.slide').last());
            });
        });

        $('.next').on('click', function() {
            inWrap.animate({left: '-200%'}, 300, function(){
                inWrap.css('left', '-100%');
                $('.slide').last().after($('.slide').first());
            });
        });

        inWrap.on('swipeleft', function() {
            inWrap.animate({left: '-200%'}, 300, function(){
                inWrap.css('left', '-100%');
                $('.slide').last().after($('.slide').first());
            });
        });
    });
})(jQuery);