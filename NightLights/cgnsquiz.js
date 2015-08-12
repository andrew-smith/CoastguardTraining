

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
	new FixedLight({ colour:"red", x: centerX + 30, y: centerY}),
	new FixedLight({ colour:"green", x: centerX - 30, y: centerY})
]);

// powered vessel coming towards us
rounds.push([
	new FixedLight({ colour:"red", x: centerX + 50, y: centerY}),
	new FixedLight({ colour:"green", x: centerX - 50, y: centerY}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90})
]);

// vessel seen from the back
// or at anchor
rounds.push([new FixedLight({ colour:"white", x: centerX, y: centerY - 100})]);


// finish round
rounds.push([new FixedLight({ colour:"grey", x: 50, y: 50})]);


// still only individual boats here

//vessel over 50 meters from the front
rounds.push([
	new FixedLight({ colour:"red", x: centerX + 50, y: centerY}),
	new FixedLight({ colour:"green", x: centerX - 50, y: centerY}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 130})
]);



//vessel over 50 meters from the starboard
rounds.push([
	new FixedLight({ colour:"green", x: centerX  + 100 , y: centerY}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX - 70, y: centerY - 130})
]);


//vessel towing from starboard
rounds.push([
	new FixedLight({ colour:"green", x: centerX  + 100 , y: centerY}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 130})
]);



//vessel towing from the stern (of any size)
rounds.push([
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"yellow", x: centerX , y: centerY - 130})
]);



// fishing vessel
rounds.push([
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"red", x: centerX , y: centerY - 130}),
	new FixedLight({ colour:"red", x: centerX + 50, y: centerY}),
	new FixedLight({ colour:"green", x: centerX - 50, y: centerY})
]);

//trawling vessel
rounds.push([
	new FixedLight({ colour:"white", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"green", x: centerX , y: centerY - 130}),
	new FixedLight({ colour:"red", x: centerX + 50, y: centerY}),
	new FixedLight({ colour:"green", x: centerX - 50, y: centerY})
]);


// RAM - NOT MAKING WAY
rounds.push([
	new FixedLight({ colour:"red", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 130}),
	new FixedLight({ colour:"red", x: centerX , y: centerY - 170})
]);


// PILOT
rounds.push([
	new FixedLight({ colour:"red", x: centerX , y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX , y: centerY - 130}),
	new FixedLight({ colour:"red", x: centerX + 50, y: centerY}),
	new FixedLight({ colour:"green", x: centerX - 50, y: centerY})
]);



//END ROUND
rounds.push([new FixedLight({ colour:"grey", x: 50, y: 50})]);



//starboard marker
// where could these be?
rounds.push([
	new FlashingLight({ 
    colour:"green",
    x: centerX,
    y: centerY,
    flashLength:600,
    period:5000,
    flashesPerPeriod: 2, 
	flashPauseLength: 600})
]);


// port marker
// where could these be?
rounds.push([
	new FlashingLight({ 
    colour:"red",
    x: centerX,
    y: centerY,
    flashLength:600,
    period:7500,
    flashesPerPeriod: 4, 
	flashPauseLength: 600})
]);


// EASTERN CARDINAL
rounds.push([
	new FlashingLight({ 
    colour:"white",
    x: centerX,
    y: centerY,
    flashLength:600,
    period:5000,
    flashesPerPeriod: 3, 
	flashPauseLength: 600})
]);


// NORTHERN CARDINAL
rounds.push([
	new FlashingLight({ 
    colour:"white",
    x: centerX,
    y: centerY,
    flashLength:600,
    period:1700,
    flashesPerPeriod: 1})
]);


// WESTERN CARDINAL
rounds.push([
	new FlashingLight({ 
    colour:"white",
    x: centerX,
    y: centerY,
    flashLength:600,
    period:13000,
    flashesPerPeriod: 9, 
	flashPauseLength: 600})
]);



// how do we instantly know it's western?
// because southern is 6 + 1



// isolated danger mark
rounds.push([
	new FlashingLight({ 
    colour:"white",
    x: centerX,
    y: centerY,
    flashLength:600,
    period:5000,
    flashesPerPeriod: 2, 
	flashPauseLength: 600})
]);


//END ROUND
rounds.push([new FixedLight({ colour:"grey", x: 50, y: 50})]);


// powered vessel towing a yacht
rounds.push([
	//towing vessel
	new FixedLight({ colour:"green", x: centerX  + 250 , y: centerY}),
	new FixedLight({ colour:"white", x: centerX + 150, y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX + 150 , y: centerY - 130}), 
	//yacht
	new FixedLight({ colour:"green", x: centerX  - 200 , y: centerY}),
]);


// pilot boat approaching a massive ship
rounds.push([
	//pilot
	new FixedLight({ colour:"red", x: centerX  + 150 , y: centerY}),
	new FixedLight({ colour:"red", x: centerX + 250, y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX + 250 , y: centerY - 130}), 
	//ship
	new FixedLight({ colour:"red", x: centerX  - 250 , y: centerY}),
	new FixedLight({ colour:"white", x: centerX  - 120 , y: centerY - 90}),
	new FixedLight({ colour:"white", x: centerX - 20 , y: centerY - 130})
]);



//END ROUND
rounds.push([new FixedLight({ colour:"grey", x: 50, y: 50})]);




//BROWNS BAY VESSEL POINTING SOUTH
rounds.push([
	new FixedLight({ colour:"green", x: width/2 - 50, y: height/2}),
	new FixedLight({ colour:"red", x: width/2 + 50, y: height/2}),
	new FixedLight({ colour:"white", x: width/2, y: height/2-50}),
	new FlashingLight({ 
	    colour:"green",
	    x: width/2 - 250,
	    y: height/2,
	    flashLength:300,
	    period:5000,
	    flashesPerPeriod: 2,
	    flashPauseLength: 750}),
	new FlashingLight({ 
	    colour:"white",
	    x: width/2 + 200,
	    y: height/4,
	    flashLength:1000,
	    period:15000,
	    flashesPerPeriod: 1,
	    radius: 40})
]);
