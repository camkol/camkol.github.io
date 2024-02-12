$(document).ready(() => {
  $(".presser").on("click", (event) => {
    $(event.currentTarget).siblings(".views").slideToggle();
  });

  $(".menu-button").on("click", () => {
    $("#nav-dropdown").slideToggle("slow");
  });

  /*$(".imagist")
    .on("mouseenter", (event) => {
      $(event.currentTarget).addClass("photo-active");
    })
    .on("mouseleave", (event) => {
      $(event.currentTarget).removeClass("photo-active");
    });*/
});
function changeImage(newSrc) {
  const image = document.getElementsByClassName("imagist");
  image.style.filter = "brightness(0%)";
  setTimeout(() => {
    image.src = newSrc;
    image.style.filter = "brightness(100%)";
  }, 300); // Adjust the timeout to match the transition duration
}

// ===== Scroll to Top ====
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $("#return-to-top").fadeIn(200); // Fade in the arrow
  } else {
    $("#return-to-top").fadeOut(200); // Else fade out the arrow
  }
});
$("#return-to-top").click(function () {
  // When arrow is clicked
  $("body,html").animate(
    {
      scrollTop: 0, // Scroll to top of body
    },
    500
  );
});
