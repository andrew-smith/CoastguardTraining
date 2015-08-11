


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
	
	// if the light is currently lit
	this.isLit = opts.isLit || true;
	
	if(!opts.colour) {
		throw Error("colour required");
	}
	this.colour = opts.colour;
	
	// quick - very quick - solid...
	this.flashType = opts.flashType || FlashType.F;
	
	// how many flashes per frequency
	this.totalFlashes = opts.totalFlashes || 0;
	
	// radius of the light 
	this.radius = opts.radius || 5;
};



Light.prototype.update = function(delta) {
	
};

// helpful for drawing complete circles
var TWOPI = Math.PI * 2;

Light.prototype.draw = function(g) {
	
	if(this.isLit) {
		
		g.save();
		
		g.beginPath();
			g.fillStyle = this.colour;
			g.arc(this.x, this.y, this.radius, 0, TWOPI);
			g.fill();
		
		g.restore();
	}
};



var FixedLight  = function(opts) {
	
	opts = opts || {};
	
	opts.flashType = FlashType.F;
	
	Light.call(this, opts);
	
		
};
FixedLight.prototype = Object.create(Light.prototype);

