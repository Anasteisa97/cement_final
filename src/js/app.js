$('.burger').on('click', function (e) {
    e.preventDefault;
    $(this).toggleClass('burger-active');
    $('.nav-active').toggleClass('nav-active_burger');
});