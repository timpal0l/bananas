function World() {
	var isDrag = false;

	var mx, my;
	// mouse coordinates
	var mySel;
	var offsetx, offsety;
	var me = this;

	this.sideMenu = new Smenu(3, 150, 30);

	this.addCog = function(config) {
		var cog = new Cog(config);
		cogs.push(cog);
	};

	this.addRect = function(x, y, w, h, fill) {
		var rect = new Box(x, y, w, h, fill);
		boxes.push(rect);
	};

	this.draw = function() {
		this.sideMenu.draw();
		var l = boxes.length;
		for ( var i = 0; i < l; i++) {
			boxes[i].drawBox();
		}
	};

	this.myMove = function(e) {
		if (isDrag) {
			me.getMouse(e);
			mySel.x = mx - offsetx;
			mySel.y = my - offsety;
		}
	};

	// @TODO
	// fix hitbox for cog.
	this.hitBox = function(e) {
		this.getMouse(e);
		var l = boxes.length;
		for ( var i = l - 1; i >= 0; i--) {
			// draw shape onto ghost context
			drawShape(gpctx, boxes[i], 'black');

			// get image data at the mouse x,y pixel
			var imageData = gpctx.getImageData(mx, my, 1, 1);
			var index = (mx + my * imageData.width) * 4;

			// if the mouse pixel exists, select and break
			if (imageData.data[3] > 0) {
				mySel = boxes[i];
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
}