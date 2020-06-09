// Sticky menu 
$(window).scroll(function(){
    if ($(window).scrollTop() >= 110) {
        // $('body').addClass('scrolled');
        $('.header').addClass('fixed-header');
    }
    else {
        $('.header').removeClass('fixed-header');
    }
});

$('#navIcone').click(function(){
    $(this).toggleClass('open');
});

// remove scroll on body if navmenu active [responsive]
$('#btnMenu').on('click', function(){
    $('body').toggleClass('noScroll')
})