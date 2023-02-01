/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = (tweet) => {
  newTweet =
  $(`<article class="tweet">
    <header>
      <div>
        <i class="fa-solid fa-user"></i>
        ${tweet.user.name}
      </div>
      <div>
        ${tweet.user.handle}
      </div>
    </header>
    <p class="tweet-text">
      ${tweet.content.text}
    </p>
    <footer>
      <div>
        ${tweet.created_at}
      </div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`)
  return newTweet;
}

const renderTweets = (data) => {
  data.forEach(user => {
    const $tweet = createTweetElement(user);
    $('#tweets-container').append($tweet);
  })
  return
}


// Test / driver code (temporary)

$(() => {
  renderTweets(data)
})