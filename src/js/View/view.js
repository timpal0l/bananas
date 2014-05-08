function drawMenu(menu) {
	context.beginPath();

	// Style
	context.lineWidth = "1";
	context.strokeStyle = "black";

	// Draw the menu
	context.moveTo(menu.w, canvas.height);
	context.arcTo(menu.w, menu.h, (menu.w + menu.bendAngle), menu.h,
			menu.bendAngle);
	context.arcTo((WIDTH - menu.w), menu.h, (WIDTH - menu.w), menu.h
			+ menu.bendAngle, menu.bendAngle);
	context.arcTo((WIDTH - menu.w), canvas.height, (WIDTH - menu.w),
			canvas.height, 0);
	context.stroke();
}

function drawSideMenu(menu){
	
	
	context.moveTo(menu.startx,menu.starty);
	context.arcTo(menu.wi,menu.starty,menu.wi,(menu.wi + menu.bendAngle),menu.bendAngle);
	context.arcTo(menu.wi,menu.he,(menu.wi - menu.bendAngle),menu.he, menu.bendAngle);
	context.arcTo(menu.startx,menu.he,menu.startx,menu.he, 0);
	context.stroke();
	
}
function drawCogImage(){
	var Cogimg = document.createElement('img');
	Cogimg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4V5k_zrWMsGyRS1boIQZnIMPSAFhH8jGAo67IDxHhxuJawuE";
	context.drawImage(Cogimg, 15,90);

}

function drawZomImage(){
	var Zomimg = document.createElement('img');
	Zomimg.src = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTg3L-rt7eYyYf8RoB9tiwYZOzzAGx7nZNHi5xsbZ2TgLK5js6W";
	context.drawImage(Zomimg, 20,200);
}

function drawCatImage(){
	var Eimg = document.createElement('img');
	Eimg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqlAD5l6_itGWKlPWu34y8JCjj-ItKNXmaODpkR83b7Flb4MkJ1Q";
	context.drawImage(Eimg,10,300);
}



function drawshape(context, shape, fill) {
  context.fillStyle = fill;
  
  // We can skip the drawing of elements that have moved off the screen:
  if (shape.x > WIDTH || shape.y > HEIGHT) return; 
  if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;
  
  context.fillRect(shape.x,shape.y,shape.w,shape.h);
};
