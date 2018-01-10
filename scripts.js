// DOM is done loading
$(function() {
  displayNewQuote();
});

// retrieve and display a quote from quotesondesign.com
//   using jquery, ajax, and an API(json)
function displayNewQuote() {
  // hide the content
  $("p#quote-content").toggle();
  $("p#quote-author").toggle();
  $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        // The data is an array of posts. Grab the first one.
        var post = data.shift();
        // inject the quote HTML into the page
        $('#quote-content').html(post.content);
        $("p#quote-content").fadeIn();
        // inject the author into the page
        $('#quote-author').text(post.title.trim());
        
        // setup the tweet button
        //   strip the html from the quote before sending
        configTweetButton(jQuery(post.content).text(), post.title);
        // delay the author fadein
        showAuthor(post.content.split(' ').length);
      },
      cache: false
    });
  
} // end displayNewQuote function

function showAuthor(words) {
  // set delay based on number of words in quote
  console.log("words in quote: " + words);
  console.log("author delay = " + (200 + (words * 100)) + " ms");
  $("p#quote-author").delay(200 + (words * 100)).fadeIn(1000);
}

// prepare and inject our twitter button url
function configTweetButton(quote, author) {
  // format quote string to be compatible with a POST call to twitter
  // replace spaces with their hex code
  quote = quote.replace(" ", "%20");
  // replace semicolons with their hex code
  quote = quote.replace(";", "%3B");
  // attach quote to twitter's tweet url on our tweet button
  $("a[class*='twitter-share-button']").prop("href", "https://twitter.com/intent/tweet?related=freeCodeCamp&text=" + '"' + quote + '" - ' + author.trim())
}

// when the main button is clicked, grab and display a new quote 
$('#get-quote').on('click', function(e) {
    e.preventDefault();
    displayNewQuote();
    // in case the last quote made the user scroll down the page, lets scroll back to the top after we load the next quote
    $(window).scrollTop(0);
});

