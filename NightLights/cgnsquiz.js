

//
// The complete quiz for the night
//

$(function() {
	$("body").keydown(function(e) {
		if(e.keyCode === 39) {
			nextRound();
		}
		else if(e.keyCode === 37) {
			previousRound();
		}
	});

});


var round_index = 0;

var nextRound = function() {
	round_index++;
	if(round_index >= rounds.length) {
		round_index = rounds.length - 1;
	}
	game.nodes = rounds[round_index];
};

var previousRound = function() {
	round_index--;
	
	if(round_index < 0) {
		round_index = 0;
	}
	game.nodes = rounds[round_index];
};


var width = getCanvas().width;
var height = getCanvas().height;

var halfW = width / 2;
var halfH = height / 2;

var centerX = halfW;
var centerY = halfH;



var rounds = [];

//two empty rounds to init things
rounds.push([]);
rounds.push([]);

// fixed green nav yacht
rounds.push([
	new FixedLight({ colour:"green", x: centerX , y: centerY})
]);


// fixed green nav powered vessel
rounds.push([
	new FixedLight({ colour:"green", x: centerX , y: centerY}),
	new FixedLight({ colour:"white", x: centerX - 50 , y: centerY - 50}),
]);


// fixed red nav
rounds.push([
	new FixedLight({ colour:"red", x: centerX , y: centerY})
]);

// yacht coming towards us
rounds.push([
	new FixedLight({ colour:"red", x: centerX - 15, y: centerY}),
	new FixedLight({ colour:"green", x: centerX + 15, y: centerY})
]);

// powered vessel coming towards us
rounds.push([
	new FixedLight({ colour:"red", x: centerX - 15, y: centerY}),
	new FixedLight({ colour:"green", x: centerX + 15, y: centerY}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 30})
]);
