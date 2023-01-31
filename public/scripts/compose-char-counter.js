$( document ).ready(function() {
  console.log( "ready!" );
  let tweetLength;

  $( '#tweet-text' ).keyup(function(){
    tweetLength = 140 - $(this).val().length; 
    $('#tweet-counter').html(tweetLength);

    tweetLength < 0 ? $('#tweet-counter').addClass('past-limit') : $('#tweet-counter').removeClass('past-limit')
  });
});




