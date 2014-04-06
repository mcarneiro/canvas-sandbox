(function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		down,
		x,
		y,
		prevX,
		prevY,
		distMap = [1, 50],
		sizeMap = [30, 3];

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
	function map(value, a, b){
		return (value - a[0]) * (b[1] - b[0]) / (a[1] - a[0]) + b[0];
	}
	function render() {
		var dist = 0;

		if (prevX !== null) {
			dist = distance([prevX, prevY], [x, y]);
			context.lineWidth = Math.max(map(dist, distMap, sizeMap), sizeMap[1]);
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(prevX, prevY);
			context.lineTo(x, y);
			context.stroke();
		}


		prevX = x;
		prevY = y;
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
		prevX = null;
	});
	document.body.addEventListener("mousedown", function(e) {
		down = true;
	});
}());