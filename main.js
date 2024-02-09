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
