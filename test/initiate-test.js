(function($, undefined){
	test('ajax call made to twitter', function(){
		//given
		var twitterUrl = 'http://search.twitter.com/search.json',
			url = "";
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet();
		//then
		ok(url.indexOf(twitterUrl) !== -1);
	});

	test('ajax call data type is jsonp', function(){
		//given
		var dataType = "";
		$.ajax = function(args){
			dataType = args.dataType;
		};
		//when
		$('#target').twitTweet();
		//then
		equal(dataType, 'jsonp');
	});

	test('ajax call timeout is 10000', function(){
		//given
		var timeout;
		$.ajax = function(args){
			timeout = args.timeout;
		};
		//when	
		$('#target').twitTweet();
		//then
		equal(timeout, 10000);
	});
})(jQuery);

$.widget("ijm.twitTweet", {
	_create: function(){
		$.ajax({
			url: 'http://search.twitter.com/search.json',
			dataType: 'jsonp',
			timeout: 10000
		});
	}
});