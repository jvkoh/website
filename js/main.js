// Generated by CoffeeScript 1.3.3
$(document).ready(function() {

    // Moving the About Modal
    var aboutM, hideH, hideS;
    aboutM = $('#aboutModal');
    hideH = aboutM.height() + 500;
    hideS = "-" + hideH + "px"
    aboutM.css({ top: hideS });

    function showAbout(e) {
        e.preventDefault();

        var aboutModal = $('#aboutModal');
        aboutModal.show();
        aboutModal.animate({
            top:"-30px"
        }, 500);

        aboutModal.addClass('show_about');
        $('#modalDim').fadeIn(500);
    }

    function hideAbout(e) {
        e.preventDefault();

        var aboutModal = $('#aboutModal');
        var hideHeight = aboutModal.height() + 500;
        var hideString = "-" + hideHeight + "px"

        aboutModal.removeClass('show_about');
        aboutModal.animate({
            top:hideString
        }, 500);

        $('#modalDim').fadeOut(500);

        setTimeout( function() {
            aboutModal.hide();
        }, 500);
    }

    $('.aboutButton').click(function(e) {
        var aboutModal = $('#aboutModal');
        if (aboutModal.hasClass('show_about')) {
            hideAbout(e);
        } else {
            showAbout(e);
        }
    });

    $('#modalDim').click(function(e) {
        hideAbout(e);
    });

});
