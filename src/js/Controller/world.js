/*
 *
 * World is the class that handle the cog wheels, menus, tutorial.
 * This includes update, draw and click events
 *
 */



function World() {

	var isDrag = false;
	var mx;
	var my;
	// mouse coordinates
	var mySel;
	var offsetx;
	var offsety;
	var me = this;
    this.tutOn = false;

	this.lastTime = (new Date()).getTime();

	this.getMx = function() {
		return mx;
	};

	this.getMy = function() {
		return my;
	};


    //Create menus
	this.sideMenu = new Smenu(450, 150, 20);
    this.colorMenu = new Colormenu(600,50,0);


    //Click event
    this.myClick = function(e){
        world.sideMenu.myClick(e);
        if (world.tutorial){
            world.tutorial.tutClick(e);
        }
    }

    //Start the tutorial
    this.startTutorial = function(){
        if (this.tutOn == false){
        this.tutorial = new Tutorial(context);
        this.tutorial.blurContext();
        this.tutorial.startStory();
        this.tutOn = true;
        }else {
            this.tutorial.endTutorial();
        }
    }

    //Add a new cog wheel
	this.addCog = function(config) {
		Logger("[World.addCog]: addCog called. Object:");
		var cog = new Cog(config);
		cogs.push(cog);
		Logger(cog);
		Logger("[World.addCog]: end.");
	};

    //Call the objects draw functions
	this.draw = function() {

		this.sideMenu.draw();
        this.colorMenu.draw();

		var l = cogs.length;
		for (var i = 0; i < l; i++) {
			if (mySel === cogs[i]) {

			} else {
				cogs[i].draw(context);
			};

		}
		if (mySel != null) {
			mySel.draw(cogctx);
		}
		context.drawImage(cogcanvas, 0, 0);
        if(this.tutOn){
            this.tutorial.tuttextctx.clearRect(0,0,WIDTH,HEIGHT);
            this.tutorial.draw();
            context.drawImage(this.tutorial.tutcanvas, 0, 0);
            context.drawImage(this.tutorial.tuttextcanvas,0,0);

        }
	};

    //Call the objects update functions
    //Change the angle of the cogs, make them turn
	this.update = function() {
		var time = (new Date()).getTime();
		var timeDiff = time - this.lastTime;
        this.sideMenu.update();
        this.sideMenu.colorUpdate();
		for (var i = 0; i < cogs.length; i++) {
			var cog = cogs[i];

			if (cogs[i].clockwise) {
				cogs[i].theta -= (cog.thetaSpeed * timeDiff);
			} else {
				cogs[i].theta += (cog.thetaSpeed * timeDiff);
			}
		}
		this.lastTime = time;
	};

    //Change the cog wheels position to mouse position if it is in "drag mode"
	this.myMove = function(e) {
		if (isDrag) {
			me.getMouse(e);
			mySel.checkHit(context);
			mySel.x = mx - offsetx;
			mySel.y = my - offsety;

		}
	};


	// Use getImageData to check "hit box" with new cog
	this.hitBox = function(e) {
		this.getMouse(e);
		var l = cogs.length;
		for (var i = l - 1; i >= 0; i--) {
			// draw shape onto ghost context
			// drawShape(gpctx, boxes[i], 'black');
			cogs[i].draw(gpctx);

			// get image data at the mouse x,y pixel
			var imageData = gpctx.getImageData(mx, my, 1, 1);

			// if the mouse pixel exists, select and break
			if (imageData.data[3] > 0) {
				mySel = cogs[i];
				offsetx = mx - mySel.x;
				offsety = my - mySel.y;
				mySel.x = mx - offsetx;
				mySel.y = my - offsety;
				isDrag = true;

				canvas.onmousemove = this.myMove;
				mousePressed = false;
				return;
			}
		}
		// havent returned means we have selected nothing
		mySel = null;
	};

    //Mouse click down
	this.myDown = function(e) {
		mouse = e;
		mousePressed = true;
	};

    //Mouse click up
	this.myUp = function() {
		isDrag = false;
		canvas.onmousemove = null;
		mousePressed = false;
		mySel = null;
	};

    //Set the coordinates of the mouse position
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

	Logger("[World.Constructor]: World is created.");
}
