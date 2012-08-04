(function($, undefined){
	module('textToLink-test');
	
	test('text contains no links or twitter addresses, text returned', function(){
		//given
		var text = 'some text';
		//when
		var result = $.textToLink(text);
		//then
		equal(result, text);
	});

})(jQuery);