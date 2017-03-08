//
// Night Navigation Lights
//


var REDRAW_RATE = 25; //in mills

var getCanvas = function() {
    return document.getElementById("canvas");
};


var getGraphics = function(canvas) {
    
    if(!canvas) {
        canvas = getCanvas();
    }
    
    return canvas.getContext("2d");
};



var game = {};

//stores all the nodes to draw
game.nodes = [];

game.drawBackground = function(g) {
    
    g.beginPath();
    
        g.rect(0,0, getCanvas().width, getCanvas().height);
        g.fillStyle = '#000000';
        g.fill();
    
    g.closePath();
};




game.gameLoopId = null;

game.start = function() {

    if(!game.gameLoopId) {
        game.lastUpdate = Date.now();
        game.lastRedraw = game.lastUpdate;
        game.gameLoopId = setInterval(game.gameloop, 50);
    }
};


game.stop = function() {

    if(game.gameLoopId) {
        clearInterval(game.gameLoopId);
        game.gameLoopId = null;
    }
};


game.isRunning = function() {
    return game.gameLoopId !== null;
};


game.gameloop = function() {
        
    var now = Date.now();
    
    var delta = now - game.lastUpdate;
    game.lastUpdate = now;
    
    for(var idx in game.nodes) {
        game.nodes[idx].update(delta);
    }
    
    //canvas's to draw on
    var graphicContexts = [];
    
    if(game.lastRedraw + REDRAW_RATE <= now) {
        graphicContexts.push(getGraphics());
        game.lastRedraw = now;
    }
    
    
    for(var graphicsIndex in graphicContexts) {
        
        var g = graphicContexts[graphicsIndex];
        
        g.clearRect(0, 0, getCanvas().width, getCanvas().height);
        
        
        g.save();
        
            game.drawBackground(g);
            
            for(var idx in game.nodes) {
                game.nodes[idx].draw(g);
            }
            
        g.restore();
    }
    
    //clearInterval(INTERVAL_ID);
};



var width = getCanvas().width;
var height = getCanvas().height;

//powered vessel
game.nodes.push(new FixedLight({ colour:"green", x: width/2 - 50, y: height/2}));
game.nodes.push(new FixedLight({ colour:"red", x: width/2 + 50, y: height/2}));
game.nodes.push(new FixedLight({ colour:"white", x: width/2, y: height/2-50}));



//browns bay reef marker
/*
game.nodes.push(new FlashingLight({ 
    colour:"green",
    x: width/2 - 250,
    y: height/2,
    flashLength:300,
    period:5000,
    flashesPerPeriod: 2,
    flashPauseLength: 750}));

//tiritiri
game.nodes.push(new FlashingLight({ 
    colour:"white",
    x: width/2 + 200,
    y: height/4,
    flashLength:550,
    period:1500,
    flashesPerPeriod: 1,
    radius: 40}));
*/

game.start();



