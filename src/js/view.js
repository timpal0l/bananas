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


