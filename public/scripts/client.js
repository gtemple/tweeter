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


const createTweetElement = (tweet) => {
  const timeAgo = timeago.format(tweet.created_at);
  const safeHTML = `<p class="tweet-text">${escape(tweet.content.text)}</p>`;
  //tweet.created_at
  newTweet = $(`<article class="tweet">
    <header>
      <div>
        <i class="fa-solid fa-user"></i>
        ${tweet.user.name}
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

$(() => {
  loadTweets();

  $("form").submit((e) => {
    e.preventDefault();
    const tweetContentValue = $("#tweet-post").val();
    const tweetContentSerialized = $("#tweet-post").serialize();

    if (!tweetContentValue) {
      alert("Your tweet form can't be empty");
      return;
    }
    if (tweetContentValue.length > 140) {
      alert("Your tweet has too many characters");
      return;
    }
    $.post("/tweets", tweetContentSerialized, () => {
      loadTweets();
    });
    $("#tweet-counter").html(140);
    $(".tweet-text").text("");
  });
});
