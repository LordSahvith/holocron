// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-left > *').css({
  'opacity': '0',
  'transform': 'translateX(' + 2 + 'em)'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-left > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateX(' + 0 + 'em)'
      });
    }
  });
});


// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-right > *').css({
  'opacity': '0',
  'transform': 'translateX(' + -2 + 'em)'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-right > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateX(' + 0 + 'em)'
      });
    }
  });
});


// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-up > *').css({
  'opacity': '0',
  'transform': 'translateY(' + 2 + 'em)'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-up > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateY(' + 0 + 'em)'
      });
    }
  });
});


// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-up-3 > *').css({
  'opacity': '0',
  'transform': 'translateY(' + 2 + 'em)'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-up-3 > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateY(' + 0 + 'em)'
      });
    }
  });
});


// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-up-2 > *').css({
  'opacity': '0',
  'transform': 'translateY(' + 2 + 'em)'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-up-2 > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateY(' + 0 + 'em)'
      });
    }
  });
});


// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-down > *').css({
  'opacity': '0',
  'transform': 'translateY(' + -2 + 'em)'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-down > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateY(' + 0 + 'em)'
      });
    }
  });
});


// Hide the element. Doing this here will prevent the elements from disappering if JS is disabled.
$('.fade-in > *').css({
  'opacity': '0'
});

// Trigger fade in as window scrolls
$(window).on('scroll load', function () {
  $('.fade-in > *').each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 6;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        'opacity': '1'
      });
    }
    //      else {
    //      $(this).css({'opacity':'0'});
    //    }
  });
});
