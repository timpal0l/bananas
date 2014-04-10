
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
	bottomMenu.widthSplit = 5;
	context.stroke();
	
}

function Menu() {
	
	var bendAngle = 30;
	
	this.widthSplit = 1;
	this.h = 600;
	
	context.beginPath();
	
	//Style
	context.lineWidth="1";
	context.strokeStyle="black";
	
}

function drawMenu(menu) {
	
	
	//Draw the menu
	context.moveTo((WIDTH/this.widthSplit), canvas.height);
	context.arcTo((WIDTH/this.widthSplit), 600, ((WIDTH/this.widthSplit) + bendAngle), 600, bendAngle);
	context.arcTo((WIDTH - (WIDTH/this.widthSplit)), 600, (WIDTH - (WIDTH/this.widthSplit)), 630, 30);
	context.arcTo((WIDTH - (WIDTH/this.widthSplit)), canvas.height, (WIDTH - (WIDTH/this.widthSplit)), canvas.height, 0);
	
}

function moveMenuDown(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	
	
	
	
}