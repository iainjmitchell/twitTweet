(function($, undefined){
	String.prototype.contains = function(text){
		return (this.indexOf(text) !== -1);
	};

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
		ok(url.contains(twitterUrl));
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

	test('results not set, default of 5 added to twitter url', function(){
		//given
		var url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet();
		//then
		ok(url.contains('&rpp=5'));
	});

	test('results set to 1, 1 result added to twitter url', function(){
		//given
		var url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet({results: 1});
		//then
		ok(url.contains('&rpp=1'));
	});

	test('userName not set, from:* added to url', function(){
		//given
		var url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet();
		//then
		ok(url.contains('?q=from:*'));
	});
})(jQuery);

$.widget("ijm.twitTweet", {
	options: {
		results: 5
	},
	_create: function(){
		$.ajax({
			url: 'http://search.twitter.com/search.json?q=from:*&rpp=' + this.options.results,
			dataType: 'jsonp',
			timeout: 10000
		});
	}
});