HEIGHT = 700;
WIDTH = 1300;
mousePressed = false;
mouse = null;
canvas = null;
context = null;
glasspanecanvas = null;
gpctx = null;
boxes = [];
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
	world.addRect(200, 200, 40, 40, '#FFC02B');

	canvas.onmousedown = world.myDown;
	canvas.onmouseup = world.myUp;
	canvas.onclick = world.sideMenu.myClick;

	//bottomMenu = new Menu(200, 5, 30);
	//var Cog = document.createElement('img'); 
	//Cog.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4V5k_zrWMsGyRS1boIQZnIMPSAFhH8jGAo67IDxHhxuJawuE";
	
	
	
	animate();
	

}

// This is the animation loop, put all objects here!!
function animate() {
	// update
	//bottomMenu.update();
    //sideMenu.update();

		
    if (mousePressed == true) {
    	world.hitBox(mouse);
    }


	// clear
	context.clearRect(0, 0, WIDTH, HEIGHT);
	gpctx.clearRect(0, 0, WIDTH, HEIGHT);

	// Draw
	//bottomMenu.drawMenu();
	//sideMenu.drawSideMenu();
	//Cog.drawCogImage();
	//sideMenu.drawIcons();
	world.draw();
	// request new frame
	requestAnimFrame(function() {
		animate();
	});
}
