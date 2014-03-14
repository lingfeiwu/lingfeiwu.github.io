
$(function(){
  $(window).resize(function(){
    if($(this).width() > 767){
	// add the following lines 
	// http://stackoverflow.com/questions/14004318/show-random-image-from-array-in-javascript
	  $imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"];
	  $basePath = "assets/images/";
	  $rand = $imgArr[Math.floor(Math.random() * $imgArr.length)];
	  $imag = $basePath + $rand;
      $.backstretch($imag, {speed: 150}); //"assets/images/background.jpg"
	  // $.backstretch("assets/images/3.jpg", {speed: 150}); //
      $('#backstretch').show();
    } else {
      $('#backstretch').hide();
    }
  })
  .resize();//trigger resize on page load
});

