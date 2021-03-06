(function($, undefined){
	module('twitTweet initiate');
	String.prototype.contains = function(text){
		return (this.indexOf(text) !== -1);
	};

	var tweet = {
		from_user: 'aUser',
		profile_image_url: 'aUrl',
		text: 'some text',
		created_at: 'a date'
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
		var tweets = [tweet];
		$.ajax = function(args){
			args.success({results: tweets});
		};
		//when
		$('#target').twitTweet();
		//then
		ok($('#target').find('div.tweet').length === 1);
	});

	test('ajax success, multiple tweets -> added to display', function(){
		//given
		var tweets = [tweet, tweet, tweet, tweet, tweet];
		$.ajax = function(args){
			args.success({results: tweets});
		};
		//when
		$('#target').twitTweet();
		//then
		equal($('#target').find('div.tweet').length, 5);
	});

	test('ajax success, image displayed', function(){
		//given
		$.ajax = function(args){
			args.success({results: [tweet]});
		};
		//when
		$('#target').twitTweet();
		//then
		var firstTweet = $('#target').find('div.tweet')[0];
		equal($(firstTweet).find('.tweet-image img').attr('src'), tweet.profile_image_url);
	});

	test('ajax success, image alt text set', function(){
		//given
		$.ajax = function(args){
			args.success({results: [tweet]});
		};
		//when
		$('#target').twitTweet();
		//then
		var firstTweet = $('#target').find('div.tweet')[0];
		equal($(firstTweet).find('.tweet-image img').attr('alt'), tweet.from_user);
	});

	test('ajax success, from user displayed', function(){
		//given
		$.ajax = function(args){
			args.success({results: [tweet]});
		};
		//when
		$('#target').twitTweet();
		//then
		var firstTweet = $('#target').find('div.tweet')[0];
		equal($(firstTweet).find('.tweet-content .tweet-user').text(), tweet.from_user);
	});

	test('ajax success, tweet text displayed', function(){
		//given
		$.ajax = function(args){
			args.success({results: [tweet]});
		};
		//when
		$('#target').twitTweet();
		//then
		var firstTweet = $('#target').find('div.tweet')[0];
		equal($(firstTweet).find('.tweet-content .tweet-text').text(), tweet.text);
	});

	test('ajax success, tweet date displayed', function(){
		//given
		$.ajax = function(args){
			args.success({results: [tweet]});
		};
		//when
		$('#target').twitTweet();
		//then
		var firstTweet = $('#target').find('div.tweet')[0];
		equal($(firstTweet).find('.tweet-content .tweet-date').text(), tweet.created_at);
	});
})(jQuery);