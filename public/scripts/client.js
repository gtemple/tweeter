/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Will convert a tweet object to html so that it can be placed on the site
const createTweetElement = (tweet) => {
  const timeAgo = timeago.format(tweet.created_at);
  const safeHTML = `<p class="tweet-text">${escape(tweet.content.text)}</p>`;
  const newTweet = $(`<article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}">
        <span>&nbsp;&nbsp;${tweet.user.name}</span>
      </div>
      <div>
        ${tweet.user.handle}
      </div>
    </header>
     ${safeHTML}
    <footer>
      <div>
        ${timeAgo}
      </div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return newTweet;
};

//renders all tweets onto the tweeter page by prepending them to the main container
const renderTweets = (data) => {
  $("#tweets-container").empty();
  data.forEach((user) => {
    const $tweet = createTweetElement(user);
    $("#tweets-container").prepend($tweet);
  });
  return;
};

const loadTweets = () => {
  const $tweets = $.get("/tweets/", (allTweets) => {
    renderTweets(allTweets);
  });
};

//handles input errors when attempting to post a tweet
const hideErrorMessages = () => {
  $(".error-message").hide(() => {});
};

const showMessage = (id) => {
  $(id).slideDown("fast", () => {});
};

//toggles and focuses the tweet input field
const focusOnTextfield = () => {
  $("form").hide()
  $( ".fa-angles-down" ).click(() => {
    console.log('hi')
    $( "form" ).slideToggle();
    $( "textarea" ).focus();
  });
}

//runs all above code when required with jquery while also handling post requests
$(() => {
  hideErrorMessages();
  loadTweets();
  showMessage();
  focusOnTextfield();

  $("form").submit((e) => {
    e.preventDefault();
    const tweetContentValue = $("#tweet-post").val();
    const tweetContentSerialized = $("#tweet-post").serialize();

    hideErrorMessages();
    if (!tweetContentValue) {
      showMessage('#empty-field');
      return;
    }
    if (tweetContentValue.length > 140) {
      showMessage('#field-too-long');
      return;
    }
    $.post("/tweets", tweetContentSerialized, () => {
      loadTweets();
    });
    $("#tweet-post").val('');
    $("#tweet-counter").html(140);
  });
});
