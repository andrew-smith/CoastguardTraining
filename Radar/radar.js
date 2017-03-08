

DEBUG_MODE = false;

if(!DEBUG_MODE) {
    $("#canvasDebug").hide();
}


var settings = {
    width : 400,
    height: 450
};


var getDebugCanvas = function() {
    return document.getElementById("canvasDebug");
};

var getCanvas = function() {
    return document.getElementById("canvasRadar");
};

var getGraphics = function(canvas) {
    if(!canvas) {
        canvas = getCanvas();
    }
    
    return canvas.getContext("2d");
};




var createBoatTarget = function(startingPos, movementVector, boatRadius) {
    
    var self = {};
    
    self.x = startingPos.x;
    self.y = startingPos.y;
    self.lastUpdate = new Date();
    self.boatRadius = boatRadius | 10;
    
    self.update = function(delta) {
        delta = delta / 1000;
        self.x += (movementVector.x * delta);
        self.y += (movementVector.y * delta);
        
        self.lastUpdate = new Date();
    };
    
    
    self.draw = function(g) {
        
        //BOAT COLOUR VALUE
        g.save();
        
            //move to boat position
            g.translate(self.x, self.y);
            
            
            //randomize the scale
            
            g.scale((Math.random()*0.5) + 0.5, (Math.random()*0.5) + 0.5);
            
            //randomize the sizes so it appears distorted like a radar
            var iterationDegrees = 45;
            var halfBoatRadius = self.boatRadius / 2;
            for(var rad = 0; rad < 360; rad += iterationDegrees) {
                g.save();
                
                    //distort
                    g.translate(Math.sin(rad) * Math.random() * halfBoatRadius, Math.cos(rad) * Math.random() * halfBoatRadius);
                    
                    
                    g.beginPath();
                        g.fillStyle = '#FF9933';
                        g.arc(0, 0, self.boatRadius, 0, 2 * Math.PI, false);
                        g.fill();
                        
                        
                        g.lineWidth = 1;
                        g.strokeStyle = 'black';
                        //g.stroke();
                    g.closePath();
                    
                g.restore();
            }
            
        
        g.restore();
    };
    
    return self;
};


var drawBackground = function(g) {
    
    g.beginPath();
    
        g.rect(-getCanvas().width/2, -getCanvas().height/2, getCanvas().width, getCanvas().height);
        g.fillStyle = '#000000';
        g.fill();
    
    g.closePath();
};


var drawRadarOverlay = function(g) {

    var radarColour = '#003300';
    
    var radius = Math.min(getCanvas().width, getCanvas().height) / 6.5;
    
    for(var i=0; i<4; i++) {
        g.beginPath();
            //inner
            g.arc(0, 0, radius * (i+1), 0, 2 * Math.PI, false);
            g.lineWidth = 2;
            g.strokeStyle = radarColour;
            g.stroke();
        g.closePath();
    }

    g.beginPath();

        g.font = "20px Georgia";

        g.fillStyle = radarColour;
        g.fillText("1/16", -15, -settings.width / 4);
        g.fillText("1/8", -15, -settings.width / 1.77);
        g.fillText("3/16", -15, -settings.width / 1.14);
        g.fillText("1/4", -15, -settings.height + (settings.height * 0.04) );

    g.closePath();
};

var drawRadarInformation = function(g) {
    //TODO
};


// -------------
// Start App
// -------------

var game = {};

//how often to redraw, in mills
var REDRAW_RATE = 1000;


var gameInit = function() {
    game.lastUpdate = Date.now();
    
    game.lastRedraw = Date.now();
    
    game.boats = [];

    game.centerVessel = createBoatTarget({x: 0, y:0}, {x: 0, y:0}, 18);
    
    //the position of the radar 
    game.x = 0;
    game.y = 0;
    
    //how the game moves every second
    game.movementVector = {x:0, y:5};
    
    
    //debug boat, coming from the right and moving to the left
    //game.boats.push(createBoatTarget({x: 200, y:-300}, {x: -15, y:0}, 15));
    
    //debug testing boat
    //game.boats.push(createBoatTarget({x: 0, y:0}, 0.1, 0) );
};

var gameloop = function() {
    
    var now = Date.now();
    
    var delta = now - game.lastUpdate;
    game.lastUpdate = now;
    
    for(var idx in game.boats) {
        game.boats[idx].update(delta);
    }
    
    var debugGraphics = getGraphics(getDebugCanvas());
    
    
    var graphicContexts = [];
    
    if(DEBUG_MODE) graphicContexts.push(debugGraphics);
    
    if(game.lastRedraw + REDRAW_RATE <= now) {
        graphicContexts.push(getGraphics());
        game.lastRedraw = now;
    }
    
    
    for(var graphicsIndex in graphicContexts) {
        
        var g = graphicContexts[graphicsIndex];
        
        g.clearRect(0, 0, getCanvas().width, getCanvas().height);
        
        
        g.save();
        
            //translate to center so center is 0,0
            var centerX = getCanvas().width / 2;
            var centerY = getCanvas().height / 2;
            g.translate(centerX, centerY);
            
            //rotate around so +y is up
            //g.rotate(Math.PI); //Math.PI == 180 degrees (in radians)
        
            drawBackground(g);
            
            game.centerVessel.draw(g);
            
            for(var idx in game.boats) {
                game.boats[idx].draw(g);
            }
            
            drawRadarOverlay(g);
            drawRadarInformation(g)
            
        g.restore();
    }
    
    //clearInterval(INTERVAL_ID);
};


var gameLoopId = null;

game.start = function() {

    if(!gameLoopId) {
        game.lastUpdate = Date.now();
        gameLoopId = setInterval(gameloop, 50);
    }
};


game.stop = function() {

    if(gameLoopId) {
        clearInterval(gameLoopId);
        gameLoopId = null;
    }
};


game.isRunning = function() {
    return gameLoopId !== null;
};



game.clearBoats = function() {
    game.boats = [];
};


gameInit();

//var INTERVAL_ID = setInterval(gameloop, 50);
