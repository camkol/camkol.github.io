// find the top of each section

var section5 = $("#section5").offset().top;
var section6 = $("#section6").offset().top;
var section7 = $("#section7").offset().top;
var section8 = $("#section8").offset().top;
var section9 = $("#section9").offset().top;
var section10 = $("#section10").offset().top;

// number of pixels before the section to change image
var scrollOffset = 300;

// run this function when the window scrolls
$(window).scroll(function () {
  // if scroll hits the top of section 5
  if (scroll < 500) {
    $(".grid-image img").attr("src", "images/experiece/beoriginal.png");
  }

  // if scroll hits the top of section 6
  if (scroll > section6) {
    $(".grid-image img").attr("src", "images/experiece/erdmaennchen.png");
  }

  // if scroll hits the top of section 7
  if (scroll > section7) {
    $(".grid-image img").attr("src", "images/experiece/usarmy.png");
  }

  // if scroll hits the top of section 8
  if (scroll > section8) {
    $(".grid-image img").attr("src", "images/experiece/boss.png");
  }

  // if scroll hits the top of section 9
  if (scroll > section9) {
    $(".grid-image img").attr("src", "images/experiece/reichdesign.png");
  }

  // if scroll hits the top of section 10
  if (scroll > section10) {
    $(".grid-image img").attr("src", "images/experiece/tidewater.png");
  }
});
