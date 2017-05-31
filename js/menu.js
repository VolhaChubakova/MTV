$(document).ready(function() {
  $('.toggle-nav').click(function(e) {
    $(this).toggleClass('menu_active');
    $('div').removeClass('label');
    $('.menu ul').toggleClass('menu_active');
    e.preventDefault();
  });
});
