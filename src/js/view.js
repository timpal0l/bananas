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
	context.moveTo(0,70);
	context.arcTo(150,70,150,170,menu.bendAngle);
	context.arcTo(150,450, 120, 450, menu.bendAngle);
	context.arcTo(0,450,0,450, 0);
	context.stroke();
}


