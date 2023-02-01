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
  const timeAgo = timeago.format(tweet.created_at)
  //tweet.created_at
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
        ${timeAgo}
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
  });
  return;
}

const loadTweets = () => {
  $.get('/tweets', () => {
    console.log('test')
    renderTweets(data);
  })
}

const createTweet = (e) => {
  e.preventDefault();
  const tweetContentValue = $('#tweet-post').val()
  const tweetContentSerialized = $('#tweet-post').serialize();

  if (!tweetContentValue) {
    alert("Your tweet form can't be empty")
    return
  }
  if (tweetContentValue.length > 140) {
    alert("Your tweet has too many characters")
    return
  }
  $.post(tweetContentSerialized)
  console.log(tweetContentSerialized)
}




$(() => {
  loadTweets();

  $('form').submit((e) => {
    createTweet(e);
  })

})

