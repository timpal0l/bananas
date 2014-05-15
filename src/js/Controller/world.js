function World() {
	var isDrag = false;

	var mx;
	var my;
	// mouse coordinates
	var mySel;
	var offsetx;
	var offsety;
	var me = this;

	this.lastTime = (new Date()).getTime();

	this.getMx = function() {
		return mx;
	};

	this.getMy = function() {
		return my;
	};

	this.sideMenu = new Smenu(3, 150, 30, this);

	this.addCog = function(config) {
		Logger("[World.addCog]: addCog called. Object:");
		var cog = new Cog(config);
		cogs.push(cog);
		Logger(cog);
		Logger("[World.addCog]: end.");
	};

	this.draw = function() {
		this.sideMenu.draw();
		var l = cogs.length;
		for (var i = 0; i < l; i++) {
			cogs[i].draw(context);
		}
	};

	this.update = function() {
		var time = (new Date()).getTime();
		var timeDiff = time - this.lastTime;
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

	this.myMove = function(e) {
		if (isDrag) {
			me.getMouse(e);
			mySel.checkHit(context);
			mySel.x = mx - offsetx;
			mySel.y = my - offsety;

		}
	};

	// @TODO
	// fix hitbox for cog.
	// Use getImageData to check hitbox with new cog?
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
			if (imageData.data[3] > 254) {
				mySel = cogs[i];
				offsetx = mx - mySel.x;
				offsety = my - mySel.y;
				mySel.x = mx - offsetx;
				mySel.y = my - offsety;
				isDrag = true;

				Logger("[World.hitBox]: xCenter: " + mySel.x);
				Logger("[World.hitBox]: yCenter: " + mySel.y);

				Logger("[World.hitBox]: xCog: " + offsetx);
				Logger("[World.hitBox]: yCog: " + offsety);

				Logger(imageData.data[3])
				canvas.onmousemove = this.myMove;
				mousePressed = false;
				return;
			}
		}
		// havent returned means we have selected nothing
		mySel = null;
	};

	this.myDown = function(e) {
		mouse = e;
		mousePressed = true;
	};

	this.myUp = function() {
		isDrag = false;
		canvas.onmousemove = null;
		mousePressed = false;
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

	Logger("[World.Constructor]: World is created.");
}