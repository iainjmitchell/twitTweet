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
})(jQuery);

$.widget("ijm.twitTweet", {
	_create: function(){
		$.ajax({
			url: 'http://search.twitter.com/search.json',
			dataType: 'jsonp'
		});
	}
});