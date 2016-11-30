var menuOut = true;
$("#menu-button").click(function() {
  if (menuOut){
      menuOut = false;
      $(".overmap").animate({
        "left": "-340px"
      }, "slow");
       if ($(window).width() < 400) {
       $(".overmap2").animate({
        "left": "-340px"
      }, "slow");}
      $("#menu-button").animate({
        "left": "60px"
      }, "slow");
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
});