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
