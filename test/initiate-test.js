(function($, undefined){
	test('ajax call made', function(){
		//given
		var ajaxCallMade = false;
		$.ajax = function(){
			ajaxCallMade = true;
		};
		//when
		$('#target').twitTweet();
		//then
		ok(ajaxCallMade);
	});
})(jQuery);

$.widget("ijm.twitTweet", {
	_create: function(){
		$.ajax();
	}
});