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

function drawSideMenu(menu) {
	context.moveTo(menu.startx, menu.starty);
	context.arcTo(menu.wi, menu.starty, menu.wi, (menu.wi + menu.bendAngle),
			menu.bendAngle);
	context.arcTo(menu.wi, menu.he, (menu.wi - menu.bendAngle), menu.he,
			menu.bendAngle);
	context.arcTo(menu.startx, menu.he, menu.startx, menu.he, 0);
	context.stroke();
}

function drawImg(img, x, y, w, h) {
	context.drawImage(img, x, y, w, h);
}

function drawCogShape(context, cog, numPoints, grd) {
	// draw cog teeth
	context.beginPath();
	context.lineJoin = 'bevel';

	for (var n = 0; n < numPoints; n++) {

		var radius = null;

		if (n % 2 == 0) {
			radius = cog.outerRadius;
		} else {
			radius = cog.innerRadius;
		}

		var theta = cog.theta;
		theta += ((Math.PI * 2) / numPoints) * (n + 1);

		var x = (radius * Math.sin(theta)) + cog.x;
		var y = (radius * Math.cos(theta)) + cog.y;

		if (n == 0) {
			context.moveTo(x, y);
		} else {
			context.lineTo(x, y);
		}
	}

	context.closePath();
	context.lineWidth = 5;
	context.strokeStyle = cog.darkColor;
	context.stroke();

	// draw cog body
	context.beginPath();
	context.arc(cog.x, cog.y, cog.midRadius, 0, 2 * Math.PI, false);

	context.fillStyle = grd;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = cog.darkColor;
	context.stroke();

	// draw cog hole
	context.beginPath();
	context.arc(cog.x, cog.y, cog.holeRadius, 0, 2 * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = cog.darkColor;
	context.stroke();
	context.restore();

}
function drawShape(context, shape, fill) {
	context.fillStyle = fill;

	// @TODO
	// Expand this to draw the cogs aswell?
	// Making it a general drawer

	// We can skip the drawing of elements that have moved off the screen:
	if (shape.x > WIDTH || shape.y > HEIGHT)
		return;
	if (shape.x + shape.w < 0 || shape.y + shape.h < 0)
		return;
	context.fillRect(shape.x, shape.y, shape.w, shape.h);
}
