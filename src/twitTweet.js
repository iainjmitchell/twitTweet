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
				var tweetTemplate = this._getTweetTemplate(),
					contents = this.element;
				$.each(twitterResponse.results, function(){
					$(tweetTemplate)
						.find('.tweet-image img')
							.prop('src', this.profile_image_url)
							.prop('alt', this.from_user)
							.end()
						.find('.tweet-user')
							.append(this.from_user)
							.end()
						.find('.tweet-text')
							.append(this.text)
							.end()
						.find('.tweet-date')
							.append(this.created_at)
							.end()
						.appendTo(contents);
				});
			}
		},
		_getTweetTemplate: function(){
			var tweetTemplate = ['<div class="tweet">','<div class="tweet-image"><img/></div>'];
			tweetTemplate.push('<div class="tweet-content">','<div class="tweet-user"></div>');
			tweetTemplate.push('<div class="tweet-text"></div>','<div class="tweet-date"></div>');
			tweetTemplate.push('</div>','</div>');
			return tweetTemplate.join('');
		}
	});
})(jQuery);