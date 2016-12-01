var menuOut = true;

function slide(){
  if (menuOut){
      menuOut = false;
      $(".overmap").animate({
        "left": "-355px"
      }, "slow");      
       if ($(window).width() < 400) {
       $(".overmap2").animate({
        "left": "-355px"
      }, "slow");} 
if ($(window).width() < 400) {
      $("#menu-button").animate({
        "left": "64px"
      }, "slow");
    } else {
          $("#menu-button").animate({
        "left": "70px"
      }, "slow");}
  }else{
      menuOut = true;
      $(".overmap").animate({
        "left": 0
      }, "slow");
      if ($(window).width() < 400) {
      $(".overmap2").animate({
        "left": "3%"
      }, "slow");}
      $("#menu-button").animate({
        "left": 0
      }, "slow");
  }
}

$("#menu-button").click(function() {
  slide();
});
 
 if($(window).width() < 400) {
$(".search-font").click(function() {
  slide();
});
}
