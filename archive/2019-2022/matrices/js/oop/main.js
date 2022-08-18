(function($) {
    $(document).ready(function() {
        const person = new Person("Sahvith", 27);

        $('.getName').on('click', function() {
            person.printName;
        });
    });
})(jQuery);