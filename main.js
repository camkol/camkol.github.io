$(document).ready(() => {
  $(".presser").on("click", (event) => {
    $(event.currentTarget).siblings(".views").slideToggle();
  });

  /* $(".menu-button").on("click", () => {
    $("#nav-dropdown").slideToggle("slow");
  });

  $(".imagist")
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
