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

})(jQuery);