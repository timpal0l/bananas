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


	// Load images
	var cogimg = document.createElement('img');
	cogimg.src = "../../lib/cogs.jpg";
	var zoomimg = document.createElement('img');
	zoomimg.src = "../../lib/zoom.jpg";
	var catimg = document.createElement('img');
	catimg.src = "../../lib/cat.jpg";

	// Create buttons
	this.cogButton = new Button(cogimg, 30, 120, 80, 70);
	this.zoomButton = new Button(zoomimg, 30, 220, 80, 80);
	this.catButton = new Button(catimg, 30, 320, 80, 80);

	// Moving speed
	this.linearSpeed = 5;
	this.startx = 0;
	this.starty = 70;

	this.draw = function() {
		drawSideMenu(this);
		this.cogButton.draw();
		this.zoomButton.draw();
		this.catButton.draw();
	};

	// Update the position of the menu
	this.update = function() {

		if (this.dir > 0) {
			this.dir = (this.wi > WIDTH) ? 0 : 1;
		}

		// Move
		this.wi += this.linearSpeed * this.dir;
		this.cogButton.x += 5 * this.dir;
		this.zoomButton.x += 5 * this.dir;
		this.catButton.x += 5 * this.dir;
	};

	this.myClick = function(e) {

		me.getMouse(e);
		var cogB = me.cogButton;

		if (mx > cogB.x 
		    && mx < cogB.w + cogB.x
			&& my > cogB.y
			&& my < cogB.h + cogB.y) {

			parent.addRect(300, 300, 40, 40, '#77DD44');
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
