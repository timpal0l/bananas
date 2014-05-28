

function drawSideMenu(menu) {
    context.beginPath();
	context.moveTo(menu.startx , menu.starty);
    context.lineTo(menu.startx + menu.wi - menu.bendAngle,menu.starty);
	context.arcTo(menu.startx + menu.wi, menu.starty, menu.startx  + menu.wi, (menu.wi + menu.bendAngle),menu.bendAngle);
	context.arcTo(menu.startx + menu.wi, menu.he, (menu.wi + menu.startx - menu.bendAngle), menu.he, menu.bendAngle);
	context.arcTo(menu.startx , menu.he, menu.startx , menu.he, 0);
	context.stroke();
    context.closePath();
}

function drawImg(img, x, y, w, h) {
	context.drawImage(img, x, y, w, h);
}

function drawTextBox(textbox) {
	var words = textbox.text.split(' ');
	var line = '';
	var origtextboxy = textbox.y;
	var height = 0;
	var padding = 10;
	var manyRows = false;
	var width;
	 

	for (var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > textbox.maxWidth - padding && i > 0) {
			context.fillStyle = "white";
			context.fillRect(textbox.x, textbox.y, textbox.maxWidth + padding, textbox.lineHeight);
			context.font = '12pt Calibri';
			context.fillStyle = '#333';
			textbox.y += textbox.lineHeight;
			height += textbox.lineHeight;
			context.fillText(line, textbox.x + padding, textbox.y);
			line = words[i] + ' ';
			manyRows = true;
		} else{
			line = testLine;
		}
	}
	if (manyRows == false) {
		width = context.measureText(line).width + padding + 5;
	} else{
		width = textbox.maxWidth + padding;
	}
	context.fillStyle = "white";
	context.fillRect(textbox.x, textbox.y, width, textbox.lineHeight + padding);
	context.font = '12pt Calibri';
	context.fillStyle = '#333';
	textbox.y += textbox.lineHeight;
	context.fillText(line, textbox.x + padding, textbox.y);
	textbox.y = origtextboxy;
	height += textbox.lineHeight + padding;
	context.strokeRect(textbox.x, textbox.y, width, height);
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
