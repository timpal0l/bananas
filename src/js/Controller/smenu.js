function Smenu(height, width, bendAngle, parent) {

	// Angle on the rounded corner
	this.bendAngle = bendAngle;

	this.parent = parent;
	this.wi = width;
	this.he = (height * this.wi);

	// Moving direction
	this.dir = 0;

	var me = this;
	var mx;
	var my;
	var color = '#FF9E9D';
	var color1 = '#AD0825';
	var count = 0;
	var moveR = 1;
	var moveL = 0;

	// Load images
	var cogimg = document.createElement('img');
	cogimg.src = "../../lib/cogs.jpg";
	var undoimg = document.createElement('img');
	undoimg.src = "../../lib/undo.svg";
	var redoimg = document.createElement('img');
	redoimg.src = "../../lib/redo.svg";
	var brushimg = document.createElement('img');
	brushimg.src = "../../lib/brush.png";
	var pilLeft = document.createElement('img');
	pilLeft.src = "../../lib/Back24.gif";
	var pilRight = document.createElement('img');
	pilRight.src = "../../lib/Forward24.gif";
	// var colorm = new Colormenu(2,50,6);

	// Create buttons
	this.cogButton = new Button(cogimg, 30, 120, 80, 70);
	this.undoButton = new Button(undoimg, 30, 250, 30, 30);
	this.redoButton = new Button(redoimg, 80, 250, 30, 30);
	this.brushButton = new Button(brushimg, 30, 320, 80, 80);
	this.lButton = new Button(pilLeft, 20, 20, 30, 30);
	this.rButton = new Button(pilRight, 80, 20, 30, 30);
	// this.cMenu = new Colormenu(2,50,5);
	// Moving speed
	this.linearSpeed = 110;
	this.startx = 0;
	this.starty = 70;

	this.draw = function() {
		drawSideMenu(this);
		this.cogButton.draw();
		this.undoButton.draw();
		this.redoButton.draw();
		this.brushButton.draw();
		this.lButton.draw();
		this.rButton.draw();
		// this.colorm.draw();
	};
	this.stop = function() {
		this.dir = 0;
	};

	// Update the position of the menu
	this.update = function() {

		if (moveR == 0 && this.dir == 1) {
			// Move menu to the right
			this.wi += this.linearSpeed * this.dir;
			this.cogButton.x += 110 * this.dir;
			this.undoButton.x += 110 * this.dir;
			this.brushButton.x += 110 * this.dir;
			this.redoButton.x += 110 * this.dir;
			moveL = 0;
			moveR = 1;
			this.stop();
		}
		// menu has been moved to the right, dont move
		else if (moveR > 0 && this.dir == 1) {
			this.stop();
		} else if (moveL == 0 && this.dir == -1) {
			// Move menu to the left
			this.wi += this.linearSpeed * this.dir;
			this.cogButton.x += 110 * this.dir;
			this.undoButton.x += 110 * this.dir;
			this.brushButton.x += 110 * this.dir;
			this.redoButton.x += 110 * this.dir;
			moveR = 0;
			moveL = 1;
			this.stop();
		}
		// menu has been moved to the left, dont move
		else if (moveL > 0 && this.dir == -1) {
			this.stop();
		}

	};

	this.myClick = function(e) {

		me.getMouse(e);
		var cogB = me.cogButton;
		var larrow = me.lButton;
		var rarrow = me.rButton;
		var brush = me.brushButton;
		var redo = me.redoButton;
		var undo = me.undoButton;

		if (mx > cogB.x && mx < cogB.w + cogB.x && my > cogB.y
				&& my < cogB.h + cogB.y) {
			var cog = new Cog({
				x : 1200,
				y : 100,
				outerRadius : 50,
				innerRadius : 15,
				midRadius : 40,
				holeRadius : 10,
				numTeeth : 12,
				theta : 0.14,
				thetaSpeed : 0,
				lightColor : color,
				darkColor : color1,
				clockwise : null,
				engine : false,
                connected : false
			});

			parent.addCog(cog);
		}

		if (mx > rarrow.x && mx < rarrow.w + rarrow.x && my > rarrow.y
				&& my < rarrow.h + rarrow.y) {
			me.dir = 1;
			me.update();
		}

		if (mx > larrow.x && mx < larrow.w + larrow.x && my > larrow.y
				&& my < larrow.h + larrow.y) {
			me.dir = -1;
			me.update();
		}
		if (mx > brush.x && mx < brush.w + brush.x && my > brush.y
				&& my < brush.h + brush.y) {
			/*
			 * if (count == 0) { count = count + 1; color = '#FF9E9D'; color1 =
			 * '#AD0825'; }
			 * 
			 * else if (count == 1) { color = '33FF33'; color1 = '339900'; count =
			 * count + 1; } else if (count == 2) { color = '#AAAAAA'; color1 =
			 * '#3959CC'; count = count + 1; } else if (count == 3) { color =
			 * '990066'; color1 = '660033'; count = count + 1; } else if (count ==
			 * 4) { color = 'FF9933'; color1 = 'FF6600'; count = 0; }
			 */
			colorm.draw();

		}
		if (mx > redo.x && mx < redo.w + redo.x && my > redo.y
				&& my < redo.h + redo.y) {
			// återställ det senaste bort tagna kugghjulet från tempvariabeln
			if (redoCogs.length == 0) {
				return;
			} else {
				var tempCog = redoCogs.pop();
				cogs.push(tempCog);
			}

		}

		if (mx > undo.x && mx < undo.w + undo.x && my > undo.y
				&& my < undo.h + undo.y) {
			if (cogs.length == 1) {
				return;
			} else {
				var tempCog = cogs.pop();
				redoCogs.push(tempCog);
			}
			// Ta bort det senaste tillagda kugghjulet o spara i en temp
			// variabel
		}

	};

	this.getMouse = function(e) {
		var element = canvas, offsetX = 0, offsetY = 0;
		if (element.offsetParent) {
			do {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
			} while ((element = element.offsetParent));
		}
		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;
	};
}
