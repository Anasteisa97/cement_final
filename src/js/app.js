$('.burger').on('click', function (e) {
    e.preventDefault;
    $(this).toggleClass('burger-active');
    $('.nav__active').toggleClass('nav__active-b');
});