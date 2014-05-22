function Smenu(height, width, bendAngle, parent) {

	// Angle on the rounded corner
	this.bendAngle = bendAngle;

	this.parent = parent;
	this.wi = width;
	this.he = (height * this.wi);

	// Moving direction
	this.dir = 0;
	this.cdir = 0;

	var me = this;
	var mx;
	var my;
	var color = '#FF9E9D';
	var color1 = '#AD0825';
	var count = 0;
	var moveR = 1;
	var moveL = 0;
	var cL = 1;
	var cR = 0;

	// Load images
	var cogimg = document.createElement('img');
	cogimg.src = "../../lib/newcog.png";
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
	var redimg = document.createElement('img');
	redimg.src = "../../lib/red.png";
	var blueimg = document.createElement('img');
	blueimg.src= "../../lib/blue.png";
	var greenimg = document.createElement('img');
	greenimg.src = "../../lib/green.png";
	var yellowimg = document.createElement('img');
	yellowimg.src = "../../lib/yellow.png";

	// Moving speed
	this.linearSpeed = 110;
	this.startx = 0;
	this.starty = 70;

	// Create buttons
	this.cogButton = new Button(cogimg, (this.wi / 2) - 55, ((this.he /4) - 55) + this.starty / 2, 110, 110);
	this.undoButton = new Button(undoimg, (this.wi / 3) - 15, ((this.he /2) - 15) + this.starty / 2, 30, 30);
	this.redoButton = new Button(redoimg, (this.wi / 3)*2  - 15, ((this.he /2) - 15) + this.starty / 2, 30, 30);
	this.brushButton = new Button(brushimg, (this.wi / 2)  - 40, ((this.he /4)*3 - 40) + this.starty / 2, 80, 80);	
	this.lButton = new Button(pilLeft, 20, 20, 30, 30);
	this.rButton = new Button(pilRight, 80, 20, 30, 30);
	this.redButton = new Button(redimg,-30, 470, 30, 30);
	this.blueButton = new Button(blueimg,-30, 500, 30, 30);
	this.greenButton = new Button(greenimg,-30, 530, 30, 30);
	this.yellowButton = new Button(yellowimg,-30, 565, 25, 25);
	this.colorMenu = new Colormenu(600,0,5);
	

	this.draw = function() {
		drawSideMenu(this);
		this.cogButton.draw();
		this.undoButton.draw();
		this.redoButton.draw();
		this.brushButton.draw();
		this.lButton.draw();
		this.rButton.draw();
		this.colorMenu.draw();
		this.redButton.draw();
		this.blueButton.draw();
		this.greenButton.draw();
		this.yellowButton.draw();
		
	};
	this.stop = function() {
		this.dir = 0;
	};
	this.cMenustop = function(){
		this.cdirr = 0;
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

	this.colorUpdate = function(){
		if(cR == 0 && cL == 1){
			this.cdirr=1;
			this.colorMenu.w += 80* this.cdirr;
			this.redButton.x += 50 * this.cdirr;
			this.blueButton.x +=50 * this.cdirr;
			this.greenButton.x += 50 * this.cdirr;
			this.yellowButton.x += 50 * this.cdirr;
			cR = 1;
			cL = 0; 
			this.cMenustop();
			}		
		else if(cL == 0 && cR == 1){
			this.cdirr = -1;
			this.colorMenu.w += 80 * this.cdirr;
			this.redButton.x += 50 * this.cdirr;
			this.blueButton.x += 50 * this.cdirr;
			this.greenButton.x += 50 * this.cdirr;
			this.yellowButton.x += 50 * this.cdirr;			

			cR = 0;
			cL = 1;
			this.cMenustop();
		}
		else {this.cMenustop();}

	};


	this.myClick = function(e) {

		me.getMouse(e);
		var cogB = me.cogButton;
		var larrow = me.lButton;
		var rarrow = me.rButton;
		var brush = me.brushButton;
		var redo = me.redoButton;
		var undo = me.undoButton;
		var red = me.redButton;
		var blue = me.blueButton;
		var green = me.greenButton;
		var yell = me.yellowButton;


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
			me.colorUpdate();

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

		if (mx > red.x && mx < red.w + red.x && my > red.y
				&& my < red.h + red.y) {
			color = '#FF9E9D';
			color1 = '#AD0825';
	}
		if (mx > blue.x && mx < blue.w + blue.x && my > blue.y
				&& my < blue.h + blue.y) {
			color = '#2f42d4';
			color1 = '#1f2d97';	
		}

		if (mx > green.x && mx < green.w + green.x && my > green.y
				&& my < green.h + green.y) {
			color = '#3dd42f';
			color1 = '#29971f';	
		}
		if (mx > yell.x && mx < yell.w + yell.x && my > yell.y
				&& my < yell.h + yell.y) {
			color1 = '#f2bc18';
			color = '#f2f218';	
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
