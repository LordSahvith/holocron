$(document).ready(function () {
    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            }
        ]
    });

    $('.machineBtn').on('click', function () {
        var prev = $('.active');
        var current = $(this);
        prev.removeClass('active');
        current.addClass('active');
        console.log(current.attr('data-machine'));
    });

});