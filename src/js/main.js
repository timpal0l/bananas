HEIGHT = 700;
WIDTH = 1300;

window.onload = function() {
	setCanvas();
};

// Request frame from browser
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

function setCanvas() {

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

	canvas.height = HEIGHT;
	canvas.width = WIDTH;

	bottomMenu = new Menu(200, 5, 30);
	animate();

}

// This is the animation loop, put all objects here!!
function animate() {
	// update
	bottomMenu.update();

	// clear
	context.clearRect(0, 0, WIDTH, HEIGHT);

	// Draw
	bottomMenu.drawMenu();

	// request new frame
	requestAnimFrame(function() {
		animate();
	});
}