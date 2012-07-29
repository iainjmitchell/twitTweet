(function($, undefined){
	$.widget("ijm.twitTweet", {
		options: {
			results: 5,
			userName: '*',
			includedMentions: true
		},
		_create: function(){
			var element = this.element;
			$.ajax({
				url: this._buildUrl(),
				dataType: 'jsonp',
				timeout: 10000, 
				error: $.proxy(this._displayError, this),
				success: function(){
				}
			});
		},
		_buildUrl: function(){
			var urlParts = ['http://search.twitter.com/search.json?q=from:', this.options.userName];
			if (this.options.includedMentions)
				urlParts.push('+OR+', this.options.userName);
			urlParts.push('&rpp=', this.options.results);
			return urlParts.join('');
		},
		_displayError: function(){
			$('<div>')
				.addClass('error')
				.append('Error connecting to twitter')
				.appendTo(this.element);
		}
	});
})(jQuery);