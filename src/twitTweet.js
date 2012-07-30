(function($, undefined){
	$.widget("ijm.twitTweet", {
		options: {
			results: 5,
			userName: '*',
			includeMentions: true
		},
		_create: function(){
			$.ajax({
				url: this._buildUrl(),
				dataType: 'jsonp',
				timeout: 10000, 
				error: $.proxy(this._displayError, this),
				success: $.proxy(this._displayTweets, this)
			});
		},
		_buildUrl: function(){
			var urlParts = ['http://search.twitter.com/search.json?q=from:', this.options.userName];
			if (this.options.includeMentions)
				urlParts.push('+OR+', this.options.userName);
			urlParts.push('&rpp=', this.options.results);
			return urlParts.join('');
		},
		_displayError: function(){
			$('<div>')
				.addClass('error')
				.append('Error connecting to twitter')
				.appendTo(this.element);
		},
		_displayTweets: function(twitterResponse){
			if (twitterResponse){
				var contents = this.element;
				$.each(twitterResponse.results, function(){
					$('<div>')
						.addClass('tweet')
						.appendTo(contents);
				});
			}
		}
	});
})(jQuery);