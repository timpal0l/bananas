var HEIGHT = 768;
var WIDTH = 1024;
var canvas;
var context;

window.onload = function(){
	generatePage();
}

function generatePage(){

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	context.fillStyle = "black";
	context.font = "bold 50px Consolas";
	context.fillText("Hej hej :)", 400, 350);
	
	var bottomMenu = new Menu();
	drawMenu(bottomMenu);	
}