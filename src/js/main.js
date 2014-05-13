HEIGHT = 700;
WIDTH = 1300;
mousePressed = false;
mouse = null;
canvas = null;
context = null;
glasspanecanvas = null;
gpctx = null;
boxes = [];
cogs = [];
world = null;

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
	glasspanecanvas = document.createElement('canvas');
	gpctx = glasspanecanvas.getContext('2d');

	canvas.height = HEIGHT;
	canvas.width = WIDTH;
	glasspanecanvas.height = HEIGHT;
	glasspanecanvas.width = WIDTH;

	world = new World();

	// @TODO get cog from the model.
	// and the user should ofcourse send the data to the model :)
	var cog1 = new Cog({
		x : 120 + 300,
		y : 105 + 100,
		outerRadius : 90,
		innerRadius : 50,
		midRadius : 80,
		holeRadius : 10,
		numTeeth : 24,
		theta : 0,
		thetaSpeed : 200, // @TODO this number should be around 1-5, something
		// is
		// dividing this down
		lightColor : '#AAAAAA',
		darkColor : '#3959CC',
		clockwise : false
	});

	var cog2 = new Cog({
		x : 222 + 300,
		y : 190 + 100,
		outerRadius : 50,
		innerRadius : 15,
		midRadius : 40,
		holeRadius : 10,
		numTeeth : 12,
		theta : 0.14,
		thetaSpeed : 400,
		lightColor : '#FF9E9D',
		darkColor : '#AD0825',
		clockwise : true
	});

	world.addCog(cog1);
	world.addCog(cog2);

	canvas.onmousedown = world.myDown;
	canvas.onmouseup = world.myUp;
	canvas.onclick = world.sideMenu.myClick;

	var time = (new Date()).getTime();
	animate(cogs);
}

// This is the animation loop, put all objects here!!
function animate(cogs) {

	// update
    world.update();

	if (mousePressed == true) {
		world.hitBox(mouse);
	}

	// clear
	context.clearRect(0, 0, WIDTH, HEIGHT);
	gpctx.clearRect(0, 0, WIDTH, HEIGHT);



	world.draw();


	// request new frame
	requestAnimFrame(function() {
		animate(cogs);

	});
}
