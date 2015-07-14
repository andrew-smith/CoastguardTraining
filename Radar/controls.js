
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

		var maxX = settings.width;
		var maxY = settings.height;

		switch(targetPosition) {

			case "north_left": 
				vesselStart.x = -maxX / 2;
				vesselStart.y = -maxY;
				break;
			case "north": 
				vesselStart.x = 0;
				vesselStart.y = -maxY;
				break;
			case "north_right": 
				vesselStart.x = maxX / 2;
				vesselStart.y = -maxY;
				break;
			case "east_upper": 
				vesselStart.x = maxX;
				vesselStart.y = -maxY / 2;
				break;
			case "east": 
				vesselStart.x = maxX;
				vesselStart.y = 0;
				break;
			case "east_lower": 
				vesselStart.x = maxX;
				vesselStart.y = maxY / 2;
				break;
			case "south_right": 
				vesselStart.x = maxX / 2;
				vesselStart.y = maxY;
				break;
			case "south": 
				vesselStart.x = 0
				vesselStart.y = maxY;
				break;
			case "south_left": 
				vesselStart.x = -maxX / 2;
				vesselStart.y = maxY;
				break;
			case "west_lower": 
				vesselStart.x = -maxX;
				vesselStart.y = maxY / 2;
				break;
			case "west": 
				vesselStart.x = -maxX;
				vesselStart.y = 0;
				break;
			case "west_upper": 
				vesselStart.x = -maxX;
				vesselStart.y = -maxY / 2;
				break;

		};


		console.log(vesselStart);
		console.log(vesselVector);

		game.boats.push(createBoatTarget(vesselStart, vesselVector, 15));

	});

});








