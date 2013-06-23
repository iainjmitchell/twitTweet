#twitTweet
THIS NO LONGER WORKS - DUE TO TWITTER CLOSING DOWN EXISTING REST API.
A simple jQuery Twitter plugin.

The git repository history also serves as an example of TDD with Javascript.

#Requirements
jQuery + jQuery-ui (core and widget)

### Usage
``` js 
//default
$('#containerDiv').twitTweet();

//with options
$('#containerDiv').twitTweet({
	results: 10, //number of results to display
	userName: 'iainjmitchell', //twitter username - default is *
	includeMentions: false //include other people mentioning this user - default is true
});
```
