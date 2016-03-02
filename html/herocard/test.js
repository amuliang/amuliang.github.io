var goldMusic = new Audio('list_files/loaded.wav');
goldMusic.startTime = 0.1;

var currentIndex = 2;

var cards = $('.box div');
var cards2 = $('.box2 div');
cards2.click(function() {
	var index = cards2.index(this);
	var step = currentIndex - index;
	if(step == 0) return;
	goldMusic.play();
	cards2.each(function() {
		var index = cards2.index(this);
		var newIndex = 3 - currentIndex + index + step;
		if(newIndex > 6) newIndex = 6;
		else if(newIndex < 0) newIndex = 0;
  		$(this).removeClass().addClass('trans' + newIndex.toString());
  		$(cards[index]).removeClass().addClass('trans' + newIndex.toString());
	});
	currentIndex = index;
});
cards2.hover(function() {
	var index = cards2.index(this);
	$(cards[index]).find('img').css('opacity', '1');
}, function() {
	var index = cards2.index(this);
	if(index != currentIndex) $(cards[index]).find('img').css('opacity', '0.6');
});