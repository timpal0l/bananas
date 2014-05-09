function Smenu(height, width, bendAngle, parent) {

	// Angle on the rounded corner
	this.bendAngle = bendAngle;

	this.parent = parent;
	this.wi = width;
	this.he = (height * this.wi);

	// Moving direction
	this.dir = 0;

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
	};

	this.myClick = function(e) {
		this.parent.getMouse(e);
	};
}