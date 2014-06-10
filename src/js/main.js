/*
*
* Main initiates the program.
* It handles the main loop
* Sets the variables and creates World
*
*/


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
// if the browser does not exist update 60fps
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

// Set the main canvas, glasspane canvas and cog canvas
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

    // Create the world
	world = new World();

	world.addCog(cogEngine);

    //Add mouse listeners
	canvas.onmousedown = world.myDown;
	canvas.onmouseup = world.myUp;
	canvas.onclick = world.myClick;
    canvas.onmousemove = world.sideMenu.myHover;

	// var time = (new Date()).getTime();
	animate();
}

// This is the animation loop, put all objects here!!
// This is getting called as soon as the browser allows it to
function animate() {
	// update
	world.update();

	if (mousePressed == true) {
		world.hitBox(mouse);
	}

	// clear contexts
	context.clearRect(0, 0, WIDTH, HEIGHT);
	gpctx.clearRect(0, 0, WIDTH, HEIGHT);
	cogctx.clearRect(0, 0, WIDTH, HEIGHT);

    //Draw
	world.draw();

	// request new frame
	requestAnimFrame(function() {
		animate();
	});
}