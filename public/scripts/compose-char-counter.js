$( document ).ready(function() {
  console.log( "ready!" );
  let tweetLength;

  $( '.tweet-text' ).keyup(function(){
    tweetLength = 140 - $(this).val().length; 
    $(this).next(".tweet-form-bottom").children('#tweet-counter').html(tweetLength);

    tweetLength < 0 ?
    $(this).next(".tweet-form-bottom").children("#tweet-counter").addClass("past-limit") :
    $(this).next(".tweet-form-bottom").children("#tweet-counter").removeClass("past-limit");
  });
});



