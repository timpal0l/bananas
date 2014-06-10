/*
 * The view handles all the drawing that needs to be done in the application
 */
function drawSideMenu(menu) { // Draw the border of the side menu
    context.beginPath();
	context.moveTo(menu.startx , menu.starty);
    context.lineTo(menu.startx + menu.wi - menu.bendAngle,menu.starty);
	context.arcTo(menu.startx + menu.wi, menu.starty, menu.startx  + menu.wi, (menu.wi + menu.bendAngle),menu.bendAngle);
	context.arcTo(menu.startx + menu.wi, menu.he, (menu.wi + menu.startx - menu.bendAngle), menu.he, menu.bendAngle);
	context.arcTo(menu.startx , menu.he, menu.startx , menu.he, 0);
	context.stroke();
    context.closePath();
}

function drawImg(img, x, y, w, h) { // Draw image
	context.drawImage(img, x, y, w, h);
}

function drawTextBox(context,textbox,padding) { // Draw textbox for tooltip
	var words = textbox.text.split(' '); // Split the text to get an array of words without spaces
	var line = '';
	var origtextboxy = textbox.y;
	var height = 0;
	var padding = padding;
	var manyRows = false;
	var width;
    var offset;
	 

	for (var i = 0; i < words.length; i++) { // Iterate through all words in the array
		var testLine = line + words[i] + ' '; // A testline used to see if it fits or if a new rows have to be created
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if ((testWidth > (textbox.maxWidth - padding/2) && i > 0)  || words[i] == '\n') { 
			// If text won't fit in one line we can draw the textbox, line, and background that is above this line
			context.fillStyle = "white"; // Start drawing the textbox
			context.fillRect(textbox.x, textbox.y, textbox.maxWidth + padding/2, textbox.lineHeight + padding);
			context.font = '12pt Calibri';
            context.fillStyle = '#333';
            if (manyRows){ // Special case for text that won't fit in one row
                textbox.y += textbox.lineHeight;
                height += textbox.lineHeight;
            }else {
                textbox.y += textbox.lineHeight + padding/3;
                height += textbox.lineHeight + padding/3;
            }
			context.fillText(line, textbox.x + padding/2, textbox.y - 5);

            if (words[i] == '\n'){ // Special case for eventual linebreaks inside the textstring in the future
               line = '';
            }else {
               line = words[i] + ' ';
            };

			manyRows = true;
		} else{ // Set line to testLine if it fits inside the textbox
			line = testLine;
		}
	}
	if (manyRows == false) { // Make the textbox just a little longer than the text in it, if it's only one row
		width = context.measureText(line).width + padding;
        offset = 0;
	} else{ // Otherwise use previously specified maxwidth
		width = textbox.maxWidth + padding/2;
        offset = 5;
	}
	// Draw the last row and surround the textbox with a grey line
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
	// Draw cog teeth
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

	// Draw cog body
	context.beginPath();
	context.arc(cog.x, cog.y, cog.midRadius, 0, 2 * Math.PI, false);

	context.fillStyle = grd;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = cog.darkColor;
	context.stroke();

	// Draw cog hole
	context.beginPath();
	context.arc(cog.x, cog.y, cog.holeRadius, 0, 2 * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = cog.darkColor;
	context.stroke();
	context.restore();
}
