

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

function drawRectButton(button,context,style){
    context.fillStyle = style;
    context.fillRect(button.x,button.y,button.w,button.h);
    context.font = '12pt Calibri';
    context.fillStyle = '#333';
    context.fillText(button.text,button.x + button.w/5,button.y + button.h/3*2);
}

function drawTextBox(context,textbox,padding) {
	var words = textbox.text.split(' ');
	var line = '';
	var origtextboxy = textbox.y;
	var height = 0;
	var padding = padding;
	var manyRows = false;
	var width;
    var offset;
	 

	for (var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if ((testWidth > (textbox.maxWidth - padding/2) && i > 0)  || words[i] == '\n') {
			context.fillStyle = "white";
			context.fillRect(textbox.x, textbox.y, textbox.maxWidth + padding/2, textbox.lineHeight + padding);
			context.font = '12pt Calibri';
            context.fillStyle = '#333';
            if (manyRows){
                textbox.y += textbox.lineHeight;
                height += textbox.lineHeight;
            }else {
                textbox.y += textbox.lineHeight + padding/3;
                height += textbox.lineHeight + padding/3;
            }
			context.fillText(line, textbox.x + padding/2, textbox.y - 5);

            if (words[i] == '\n'){
               line = '';
            }else {
               line = words[i] + ' ';
            };

			manyRows = true;
		} else{
			line = testLine;
		}
	}
	if (manyRows == false) {
		width = context.measureText(line).width + padding;
        offset = 0;
	} else{
		width = textbox.maxWidth + padding/2;
        offset = 5;
	}
	context.fillStyle = "white";
	context.fillRect(textbox.x, textbox.y , width, textbox.lineHeight + padding);
	context.font = '12pt Calibri';
	context.fillStyle = '#333';
	textbox.y += textbox.lineHeight;
	context.fillText(line, textbox.x + padding/2, textbox.y - offset );
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
