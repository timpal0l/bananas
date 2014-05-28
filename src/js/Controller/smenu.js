function Smenu(height, width, bendAngle) {

	// Angle on the rounded corner
	this.bendAngle = bendAngle;

	this.wi = width;
    this.maxWidth = this.wi;
	this.he = height;

	// Moving direction
	this.dir = 0;

    // Moving speed
    this.linearSpeed = 5;
    this.startx = 0;
    this.starty = 70;

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
	var cog = new Cog({
		x : 60,
		y : 150,
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
	var cogimg = new Cog(cog);

	// Buttons source
	var tutimg = document.createElement('img');
	tutimg.src = "../../lib/tut.png";
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
	blueimg.src = "../../lib/blue.png";
	var greenimg = document.createElement('img');
	greenimg.src = "../../lib/green.png";
	var yellowimg = document.createElement('img');
	yellowimg.src = "../../lib/yellow.png";



	//tooltips
	var ttCog = "Add a new cogwheel";
	var ttTut = "View the tutorial";
	var ttUndo = "Undo";
	var ttRedo = "Redo";
	var ttBrush = "Change color of next cogwheel";
	var ttLeft = "Hide side menu";
	var ttRight = "Show side menu";
	var ttRed = "Change next cogwheel to red";
	var ttBlue = "Change next cogwheel to blue";
	var ttGreen = "Change next cogwheel to green";
	var ttYellow = "Change next cogwheel to yellow";

	// Create buttons
	this.cogButton = new Button(cogimg, (this.wi / 2) - 55, 
			((this.he /4) - 70) + this.starty / 2, 110, 110, ttCog);
	this.tutButton = this.brushButton = new Button(tutimg, (this.wi / 2) - 40,
			((this.he / 4) * 3 - 175) + this.starty / 2, 80, 80, ttTut);
	this.undoButton = new Button(undoimg, (this.wi / 3) - 15, 
			((this.he /2) + 40) + this.starty / 2, 30, 30, ttUndo);
	this.redoButton = new Button(redoimg, (this.wi / 3)*2  - 15, 
			((this.he /2) + 40) + this.starty / 2, 30, 30, ttRedo);
	this.brushButton = new Button(brushimg, (this.wi / 2)  - 40, 
			((this.he /4)*3 - 10) + this.starty / 2, 80, 80, ttBrush);	
	this.lButton = new Button(pilLeft, 20, 20, 30, 30, ttLeft);
	this.rButton = new Button(pilRight, 80, 20, 30, 30, ttRight);
	this.redButton = new Button(redimg,-30, 470, 30, 30, ttRed);
	this.blueButton = new Button(blueimg,-30, 500, 30, 30, ttBlue);
	this.greenButton = new Button(greenimg,-30, 530, 30, 30, ttGreen);
	this.yellowButton = new Button(yellowimg,-30, 565, 25, 25, ttYellow);


    buttons.push(this.cogButton,
    	this.tutButton,
    	this.redoButton,
        this.undoButton,
        this.brushButton,
        this.rButton,
        this.lButton,
        this.yellowButton,
        this.greenButton,
        this.blueButton,
        this.redButton
        )


	this.draw = function() {
		drawSideMenu(this);
        for(var i = 0; i < buttons.length; i++){
            buttons[i].draw();
        }
		
	};
	this.stop = function() {
		this.dir = 0;
	};
	this.cMenustop = function() {
        world.colorMenu.dir = 0;
	};

	// Update the position of the menu
	this.update = function() {

		if (moveR == 0 && this.dir == 1) {
			// Move menu to the right
			this.startx += this.linearSpeed * this.dir;
			this.cogButton.img.x += this.linearSpeed * this.dir;
            this.cogButton.x += this.linearSpeed * this.dir;
			this.tutButton.x += this.linearSpeed * this.dir;
			this.undoButton.x += this.linearSpeed * this.dir;
			this.brushButton.x += this.linearSpeed * this.dir;
			this.redoButton.x += this.linearSpeed * this.dir;

            if (this.startx > -10) {
                moveL = 0;
                moveR = 1;
                this.stop();
            }
		}
		// menu has been moved to the right, dont move
		else if (moveR > 0 && this.dir == 1) {
			this.stop();
		} else if (moveL == 0 && this.dir == -1) {
			// Move menu to the left
			this.startx += this.linearSpeed * this.dir;
			this.cogButton.img.x += this.linearSpeed * this.dir;
            this.cogButton.x += this.linearSpeed * this.dir;
			this.tutButton.x += this.linearSpeed * this.dir;
			this.undoButton.x += this.linearSpeed * this.dir;
			this.brushButton.x += this.linearSpeed * this.dir;
			this.redoButton.x += this.linearSpeed * this.dir;

            if (this.startx < -140) {
                moveR = 0;
                moveL = 1;
                this.stop();
            }
		}
		// menu has been moved to the left, dont move
		else if (moveL > 0 && this.dir == -1) {
			this.stop();
		}
	};

	this.colorUpdate = function() {
        if (world.colorMenu.dir == 1) {
			world.colorMenu.startx += this.linearSpeed * world.colorMenu.dir;
			this.redButton.x += this.linearSpeed * world.colorMenu.dir;
			this.blueButton.x += this.linearSpeed * world.colorMenu.dir;
			this.greenButton.x += this.linearSpeed * world.colorMenu.dir;
			this.yellowButton.x += this.linearSpeed * world.colorMenu.dir;
            if (world.colorMenu.startx > -10) {
                this.cMenustop();
            }
		} else if (world.colorMenu.dir == -1) {
			world.colorMenu.startx += this.linearSpeed * world.colorMenu.dir;
            this.redButton.x += this.linearSpeed * world.colorMenu.dir;
            this.blueButton.x += this.linearSpeed * world.colorMenu.dir;
            this.greenButton.x += this.linearSpeed * world.colorMenu.dir;
            this.yellowButton.x += this.linearSpeed * world.colorMenu.dir;
            if (world.colorMenu.startx < -40) {
                this.cMenustop();
            }
		}
	};

    this.myHover = function(e) {
        for(var i = 0; i < buttons.length; i++){
            me.getMouse(e);
            //Logger(mx + " ," + my);
            if (mx > buttons[i].x && mx < buttons[i].w + buttons[i].x && my > buttons[i].y
                && my < buttons[i].h + buttons[i].y) {
            	textBox = new TextBox(buttons[i].toolTipText, mx, my);
            	buttons[i].toolTip = textBox;
                if (buttons[i].enlarged == false){
                    buttons[i].toggle();
                    buttons[i].enlarged = true;
                    buttons[i].showTT = true;
                }
            }else {
                if (buttons[i].enlarged == true){
                    buttons[i].toggle();
                    buttons[i].enlarged = false;
                    buttons[i].showTT = false;
                }
            }
        }
    }


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

			world.addCog(cog);
		}

		if (mx > rarrow.x && mx < rarrow.w + rarrow.x && my > rarrow.y
				&& my < rarrow.h + rarrow.y) {
			me.dir = 1;
		}

		if (mx > larrow.x && mx < larrow.w + larrow.x && my > larrow.y
				&& my < larrow.h + larrow.y) {
			me.dir = -1;
		}
		if (mx > brush.x && mx < brush.w + brush.x && my > brush.y
				&& my < brush.h + brush.y) {
            Logger(world.colorMenu.dir);
            if (world.colorMenu.dir == 0){
                if(world.colorMenu.startx < -40){
                    world.colorMenu.dir = 1;
                }else{
                    world.colorMenu.dir = -1;
                }
            }else {
                world.colorMenu.dir *= -1;
            }
            Logger(world.colorMenu.dir);


		}

		if (mx > redo.x && mx < redo.w + redo.x && my > redo.y
				&& my < redo.h + redo.y) {
			// återställ det senaste borttagna kugghjulet från tempvariabeln
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
			cogB.img.lightColor = color;
			cogB.img.darkColor = color1;
		}

		if (mx > blue.x && mx < blue.w + blue.x && my > blue.y
				&& my < blue.h + blue.y) {
			color = '#2f42d4';
			color1 = '#1f2d97';
			cogB.img.lightColor = color;
			cogB.img.darkColor = color1;
		}

		if (mx > green.x && mx < green.w + green.x && my > green.y
				&& my < green.h + green.y) {
			color = '#3dd42f';
			color1 = '#29971f';	
			cogB.img.lightColor = color;
			cogB.img.darkColor = color1;
		}
		if (mx > yell.x && mx < yell.w + yell.x && my > yell.y
				&& my < yell.h + yell.y) {
			color1 = '#f2bc18';
			color = '#f2f218';
			cogB.img.lightColor = color;
			cogB.img.darkColor = color1;
		}
		canvas.onmousemove = world.sideMenu.myHover;

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
