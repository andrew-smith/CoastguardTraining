


var FlashType = {
	F: 'fixed',
	Fl: 'flashing',
	Q: 'quick flashing',
	VQ: 'very quick flashing',
	IQ: 'interrupted quick flashing',
	Iso: 'isophase',
	
};



var Light = function(opts) {
	opts = opts || {};
	
	// location of the light
	this.x = opts.x || 0;
	this.y = opts.y || 0;
	
	//last update for timing
	this.lastUpdate = new Date();
	
	// if the light is currently lit
	this.isLit = true;
	if(typeof opts.isLit === "boolean") {
		this.isLit = opts.isLit;
	}
	
	// time to live - count down till the light state swaps
	this.ttl = 0;
	
	if(!opts.colour) {
		throw Error("colour required");
	}
	this.colour = opts.colour;
	
	// quick - very quick - solid...
	this.flashType = opts.flashType || FlashType.F;
	
	// how many flashes per period
	this.flashesPerPeriod = opts.flashesPerPeriod || 0;
	
	// how long to pause before the next light in the period is lit
	this.flashPauseLength = opts.flashPauseLength || 0;
	
	//keeps track of how many times this period has flashed
	this.currentFlashesPerPeriod = 0;
	
	this.period = opts.period || 0;
	
	//how long this period has left to go
	this.ttlPeriod = this.period;
	
	//how long the light is on for
	this.flashLength = opts.flashLength || 0;
	
	// radius of the light 
	this.radius = opts.radius || 25;
};


// empty update method for other objects to implement
Light.prototype.update = function(delta) {
	this.lastUpdate = new Date();
};

// helpful for drawing complete circles
var TWOPI = Math.PI * 2;

Light.prototype.draw = function(g) {
	
	if(this.isLit) {
		
		g.save();
		
		g.beginPath();
		
			var rad = this.radius;
			var halfRad = rad/2;
		
			var circleX = this.x - halfRad;
			var circleY = this.y - halfRad;
			
			var gradient = g.createRadialGradient(circleX,circleY,halfRad,circleX,circleY,0);
			gradient.addColorStop(0, "black"); // no alpha support :(
			gradient.addColorStop(1, this.colour);
			
			g.fillStyle = gradient;
			g.fillRect(circleX - halfRad, circleY - halfRad, rad, rad);
		
		g.restore();
	}
};



var FixedLight  = function(opts) {
	
	opts = opts || {};
	opts.flashType = FlashType.F;
	
	Light.call(this, opts);
};
FixedLight.prototype = Object.create(Light.prototype);



var FlashingLight = function(opts) {
	
	opts = opts || {};
	opts.flashType = FlashType.Fl;
	opts.flashLength = opts.flashLength || 400;
	opts.period = opts.period || 5000;
	opts.flashesPerPeriod = opts.flashesPerPeriod || 2;
	opts.flashPauseLength = opts.flashPauseLength || 750;
	
	Light.call(this, opts);
};
FlashingLight.prototype = Object.create(Light.prototype);
FlashingLight.prototype.constructor = FlashingLight;

FlashingLight.prototype.update = function(delta) {
	
	this.ttl -= delta;
	this.ttlPeriod -= delta;
	
	if(this.currentFlashesPerPeriod < this.flashesPerPeriod) { //make sure the phase isn't over
		if(this.isLit && this.ttl <= 0) { //light is on and it's time to turn it off
			this.isLit = false;
			this.ttl = this.flashPauseLength;
			
			this.currentFlashesPerPeriod++;
		}
		else if (!this.isLit && this.ttl <= 0) { //light is off and it's time to turn it on
			this.isLit = true;
			this.ttl = this.flashLength;
		}
	}
	
	if(this.ttlPeriod <= 0) { //new period - so reset
		this.ttlPeriod = this.period;
		this.currentFlashesPerPeriod = 0;
	}
	
};
