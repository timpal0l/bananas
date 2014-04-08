window.onload = function(){
	generatePage();
}

function generatePage(){

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	canvas.width = 1024;
	canvas.height = 768;

	context.fillStyle = "black";
	context.font = "bold 50px Consolas";
	context.fillText("Hej hej :)", 400, 350);
}