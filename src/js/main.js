
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

function Menu() {
	
	this.bendAngle = 30;
	this.widthSplit = 5;
	this.h = 600;
}

function drawMenu(menu) {
	context.beginPath();
	
	//Style
	context.lineWidth="1";
	context.strokeStyle="black";
	
	//Draw the menu
	context.moveTo((WIDTH/menu.widthSplit), canvas.height);
	context.arcTo((WIDTH/menu.widthSplit), 600, ((WIDTH/menu.widthSplit) + menu.bendAngle), 600, menu.bendAngle);
	context.arcTo((WIDTH - (WIDTH/menu.widthSplit)), 600, (WIDTH - (WIDTH/menu.widthSplit)), 630, menu.bendAngle);
	context.arcTo((WIDTH - (WIDTH/menu.widthSplit)), canvas.height, (WIDTH - (WIDTH/menu.widthSplit)), canvas.height, 0);
	context.stroke();
}

function moveMenuDown(){
	

	
	
	
	
}