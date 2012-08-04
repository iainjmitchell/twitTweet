(function($, undefined){
	module('twitter link parser');

	test('text contains no links or twitter addresses, text returned', function(){
		//given
		var text = 'some text';
		//when
		var result = $.twitterLinkParser(text);
		//then
		equal(result, text);
	});

	test('text contains a http link with spaces around, wrapped in an html anchor', function(){
		//given
		var text = 'this http://www.google.com here',
			expected = 'this <a href="http://www.google.com">http://www.google.com</a> here'
		//when
		var result = $.twitterLinkParser(text);
		//then
		equal(result, expected);
	});

})(jQuery);