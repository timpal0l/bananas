HEIGHT = 700;
WIDTH = 1300;

window.onload = function(){
	setCanvas();
	window.addEventListener("mousemove", foo, false);
}

function setCanvas(){

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	
	canvas.height = HEIGHT;
	canvas.width = WIDTH;

	var bottomMenu = new Menu();
	drawMenu(bottomMenu);	

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