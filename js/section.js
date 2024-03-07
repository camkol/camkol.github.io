//section sliding
// find the top of each section
var section1 = $("#section1").offset().top;
var section2 = $("#section2").offset().top;
var section3 = $("#section3").offset().top;
var section4 = $("#section4").offset().top;
var section5 = $("#section5").offset().top;
var section6 = $("#section6").offset().top;

// number of pixels before the section to change image
var scrollOffset = 300;

// run this function when the window scrolls
$(window).scroll(function () {
  // get the window height on scroll
  var scroll = $(window).scrollTop() + scrollOffset;

  // if scroll hits the top of section 1
  if (scroll < 500) {
    $(".grid-image img").attr("src", "images/experiece/beoriginal.png");
  }

  // if scroll hits the top of section 2
  if (scroll > section2) {
    $(".grid-image img").attr("src", "images/experiece/erdmaennchen.png");
  }

  // if scroll hits the top of section 3
  if (scroll > section3) {
    $(".grid-image img").attr("src", "images/experiece/usarmy.png");
  }

  // if scroll hits the top of section 4
  if (scroll > section4) {
    $(".grid-image img").attr("src", "images/experiece/boss.png");
  }

  // if scroll hits the top of section 5
  if (scroll > section5) {
    $(".grid-image img").attr("src", "images/experiece/reichdesign.png");
  }

  // if scroll hits the top of section 6
  if (scroll > section6) {
    $(".grid-image img").attr("src", "images/experiece/tidewater.png");
  }
});
