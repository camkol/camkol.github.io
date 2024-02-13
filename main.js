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
  const image = document.querySelector(".modal-body .imagist");
  if (image) {
    image.src = newSrc;
  }
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

/*$(document).ready(() => {
  // This event is triggered when the modal is about to be shown
  $("#enlargeXystinyfindModal").on("show.bs.modal", function () {
    // Hide the original content when the modal is shown
    $(".card.presenter").addClass("d-none");
  });

  // This event is triggered when the modal has finished being hidden
  $("#enlargeXystinyfindModal").on("hidden.bs.modal", function () {
    // Show the original content when the modal is hidden
    $(".card.presenter").removeClass("d-none");
  });
});*/
