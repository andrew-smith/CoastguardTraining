
//
// Controls 
//

$(function() {

	var btnStartStop = $("#btnStartStop");

	btnStartStop.click(function() {

		if(game.isRunning()) {
			
			game.stop();
			btnStartStop.html("Start");
		}
		else {
			game.start();
			btnStartStop.html("Stop");
		}

	});


	var btnNewBoat = $("#btnSpawnBoat");


	btnNewBoat.click(function() {

		var targetHeading = $("#targetHeading").val();
		var targetPosition = $("#targetPosition").val();


		var vesselVector = {x: 0, y: 0};
		var vesselStart = {x: 0, y: 0};


		switch(targetHeading) {
			case "N": 
				vesselVector.y = -1;
				break;
			case "NW": 
				vesselVector.y = -0.75;
				vesselVector.x = -0.75;
				break;
			case "W": 
				vesselVector.x = -1;
				break;
			case "SW": 
				vesselVector.y = 0.75;
				vesselVector.x = -0.75;
				break;
			case "S": 
				vesselVector.y = 1;
				break;
			case "SE": 
				vesselVector.y = 0.75;
				vesselVector.x = 0.75;
				break;
			case "E": 
				vesselVector.x = 1;
				break;
			case "NE": 
				vesselVector.y = -0.75;
				vesselVector.x = 0.75;
				break;
		};

		var vectorSpeed = 15;
		vesselVector.x = vesselVector.x * vectorSpeed;
		vesselVector.y = vesselVector.y * vectorSpeed;

		var maxX = 350;
		var maxY = 350;

		switch(targetPosition) {

			case "north_left": 
				vesselStart.x = -maxX;
				vesselStart.y = -maxY;
				break;
			case "north": 
				vesselStart.x = 0;
				vesselStart.y = -maxY;
				break;
			case "north_right": 
				vesselStart.x = maxX;
				vesselStart.y = -maxY;
				break;

		};


		console.log(vesselStart);
		console.log(vesselVector);

		game.boats.push(createBoatTarget(vesselStart, vesselVector, 15));

	});

});








