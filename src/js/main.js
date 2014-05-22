HEIGHT = 700;
WIDTH = 1300;
mousePressed = false;
mouse = null;
canvas = null;
context = null;
glasspanecanvas = null;
gpctx = null;
world = null;
cogctx = null;
concanvas = null;

window.onload = function() {
	Logger("[Window.Onload]: Setting canvas...");
	setCanvas();
	Logger("[Window.Onload]: Canvas setup complete.");
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
	glasspanecanvas = document.createElement('canvas');
	gpctx = glasspanecanvas.getContext('2d');
	cogcanvas = document.createElement('canvas');
	cogctx = cogcanvas.getContext('2d');

	canvas.height = HEIGHT;
	canvas.width = WIDTH;
	glasspanecanvas.height = HEIGHT;
	glasspanecanvas.width = WIDTH;
	cogcanvas.height = HEIGHT;
	cogcanvas.width = WIDTH;

	world = new World();

	// @TODO get cog from the model.
	// and the user should ofcourse send the data to the model :)

	world.addCog(cogEngine);

	canvas.onmousedown = world.myDown;
	canvas.onmouseup = world.myUp;
	canvas.onclick = world.sideMenu.myClick;
    canvas.onmousemove = world.sideMenu.myHover;

	// var time = (new Date()).getTime();
	animate();
}

// This is the animation loop, put all objects here!!
function animate() {
	// update
	world.update();

	if (mousePressed == true) {
		world.hitBox(mouse);
	}

	// clear
	context.clearRect(0, 0, WIDTH, HEIGHT);
	gpctx.clearRect(0, 0, WIDTH, HEIGHT);
	cogctx.clearRect(0, 0, WIDTH, HEIGHT);

	world.draw();

	// request new frame
	requestAnimFrame(function() {
		animate();
	});
}