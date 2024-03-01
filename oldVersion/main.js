$(document).ready(() =>{
    $('.presser').on('click', event => {
      $(event.currentTarget).siblings('.views').slideToggle();
    })
 
  

    $('.menu-button').on('click',() => {
      $('#nav-dropdown').slideToggle('slow');
    });

});