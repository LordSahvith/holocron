
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script>
    (function ($) {
      $(document).ready(function () {
        var $offsetMove = $("nav").outerHeight();
        // watch for window scroll
        $(window).scroll(function () {
          var $window = $(window).scrollTop();
          // fix menu inside of flex container when content is reached
          if ($window > $offsetMove) {
            $('.productMenuContainer').addClass('fixed');
          } else {
            $('.productMenuContainer').removeClass('fixed');
          }
        });
      });
    })(jQuery);
  </script>

</body>

</html>