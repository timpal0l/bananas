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
	var Cogimg = document.createElement('img');
	Cogimg.src = "/home/andrea/Bananasgrupp/b2/bananas/lib/cog.png";
	context.moveTo(menu.startx,menu.starty);
	context.arcTo(menu.wi,menu.starty,menu.wi,(menu.wi + menu.bendAngle),menu.bendAngle);
	context.arcTo(menu.wi,menu.he,(menu.wi - menu.bendAngle),menu.he, menu.bendAngle);
	context.arcTo(menu.startx,menu.he,menu.startx,menu.he, 0);
	context.drawImage(Cogimg, 10,60);
	context.stroke();
}


function drawshape(context, shape, fill) {
  context.fillStyle = fill;
  
  // We can skip the drawing of elements that have moved off the screen:
  if (shape.x > WIDTH || shape.y > HEIGHT) return; 
  if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;
  
  context.fillRect(shape.x,shape.y,shape.w,shape.h);
}
