
$(function(){
  $(window).resize(function(){
    if($(this).width() > 767){
	// add the following lines 
	// http://stackoverflow.com/questions/14004318/show-random-image-from-array-in-javascript
	  $imgArr = ["tree.jpg"];
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

