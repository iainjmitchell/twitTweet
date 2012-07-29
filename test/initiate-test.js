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

	test('userName set, from:username added to url', function(){
		//given
		var userName = 'aUser',
			url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet({userName: userName});
		//then
		ok(url.contains('?q=from:'+userName))
	});

	test('userName not set & includeMentions not set, then * OR * included in url', function(){
		//given
		var url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet();
		//then
		ok(url.contains('?q=from:*+OR+*'))
	});

	test('userName set & includeMentions not set, then userName and OR included in url', function(){
		//given
		var userName = "anotherUser",
			url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet({userName: userName})
		//then
		ok(url.contains('?q=from:' + userName + '+OR+' + userName));
	});

	test('includeMentions disabled, then url does not include OR for userName', function(){
		//given
		var url;
		$.ajax = function(args){
			url = args.url;
		};
		//when
		$('#target').twitTweet({includeMentions: false})
		//then
		ok(!url.contains('+OR+'));
	});

	test('error returned from ajax, error added to display', function(){
		//given
		$.ajax = function(args){
			args.error();
		};
		//when
		$('#target').twitTweet();
		//then
		ok($('#target').find('div.error').length === 1); 
	});

	test('error returned from ajax, error message added to display', function(){
		//given
		$.ajax = function(args){
			args.error();
		};
		//when
		$('#target').twitTweet();
		//then
		equal($('#target').find('div.error').text(), 'Error connecting to twitter'); 
	});

	test('ajax success, no tweets added', function(){
		//given
		$.ajax = function(args){
			args.success();
		};
		//when
		$('#target').twitTweet();
		//then
		ok($('#target').find('div.tweet').length === 0);
	});

	test('ajax success, one tweet added to display', function(){
		//given
		var tweets = [{
			from_user: 'aUser',
			profile_image_url: 'aUrl',
			text: 'some text',
			created_at: 'a date'
		}];
		$.ajax = function(args){
			args.success(tweets);
		};
		//when
		$('#target').twitTweet();
		//then
		ok($('#target').find('div.tweet').length === 1);
	});
})(jQuery);