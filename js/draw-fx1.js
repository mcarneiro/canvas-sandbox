(function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		down,
		x,
		y,
		distConnectMin = 5,
		distConnectMax = 15,
		history = [];

	function distance(a, b) {
		var width = Math.abs(b[0] - a[0]),
			height = Math.abs(b[1] - a[1]),
			result = 0;

		if (isNaN(width) || isNaN(height)) {
			return 0;
		}

		result = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

		return result || 0;
	}
	function checkNearPositions(x, y) {
		var i,
			len = history.length,
			dist;
		
		for (i = 0; i < len; i++) {
			dist = distance([x,y], history[i]);
			if (dist < distConnectMax && dist > distConnectMin) {
				context.beginPath();
				context.moveTo(history[i][0], history[i][1]);
				context.lineTo(x, y);
				context.stroke();

			}
		}
	}
	function render() {
		var dist = 0;
		
		context.lineCap = "round";
		context.strokeStyle = "rgba(50, 50, 50, 0.05)";
		context.lineWidth = 1;
		
		checkNearPositions(x, y);
		history.push([x, y]);
	}

	document.body.addEventListener("mousemove", function(e) {
		x = e.clientX;
		y = e.clientY;
		if (down) {
			render();
		}
	});
	document.body.addEventListener("mouseup", function(e) {
		down = false;
		// prevX = null;
	});
	document.body.addEventListener("mousedown", function(e) {
		down = true;
	});
}());