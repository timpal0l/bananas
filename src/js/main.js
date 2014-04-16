HEIGHT = 700;
WIDTH = 1300;

//Request frame from browser
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
})();

window.onload = function(){
	setCanvas();
	window.addEventListener("mousemove", foo, false);	
}

function setCanvas(){

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	
	canvas.height = HEIGHT;
	canvas.width = WIDTH;

	bottomMenu = new Menu(200,5,30);
	animate();
	

}
	
function foo(e){
	//context.clearRect(700,200,700,200);
	//funny function that follows the mouse!
	
	var xPos = e.clientX;
	var yPos = e.clientY;
	
	context.fillStyle = "lightgreen";
	context.font = "bold 20px Consolas";
	context.fillText(".", xPos - 192, yPos);
}


//This is the animation loop, put all objects here!!
function animate(){
		// update
	    bottomMenu.update();

	    // clear
	    context.clearRect(0, 0, WIDTH, HEIGHT);

	    //Draw
	    bottomMenu.drawMenu();
	
	    // request new frame
	    requestAnimFrame(function() {
	    	animate();
	    });
}		