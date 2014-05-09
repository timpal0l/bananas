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
	var pilLeft = document.createElement('img');
	pilLeft.src = "../../lib/Back24.gif";
	var pilRight = document.createElement('img');
	pilRight.src = "../../lib/Forward24.gif";

	// Create buttons
	this.cogButton = new Button(cogimg, 30, 120, 80, 70);
	this.zoomButton = new Button(zoomimg, 30, 220, 80, 80);
	this.catButton = new Button(catimg, 30, 320, 80, 80);
	this.lButton = new Button(pilLeft, 70, 20, 30,30);
	this.rButton = new Button(pilRight,150,20,30,30);
	

	// Moving speed
	this.linearSpeed = 5;
	this.startx = 0;
	this.starty = 70;

	this.draw = function() {
		drawSideMenu(this);
		this.cogButton.draw();
		this.zoomButton.draw();
		this.catButton.draw();
		this.lButton.draw();
		this.rButton.draw();
	};
	this.stop = function(){
	this.dir = 0;
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
		this.stop();
	};

	this.myClick = function(e) {

		me.getMouse(e);
		var cogB = me.cogButton;
		var larrow = me.lButton;
		var rarrow = me.rButton;

		if (mx > cogB.x 
		    && mx < cogB.w + cogB.x
			&& my > cogB.y
			&& my < cogB.h + cogB.y) {

			parent.addRect(300, 300, 40, 40, '#77DD44');
		}
	
		if(mx > rarrow.x 
		    && mx < rarrow.w + rarrow.x
			&& my > rarrow.y
			&& my < rarrow.h + rarrow.y){
			me.dir = 1;
			me.update();
		}
		
		if(mx > larrow.x 
		    && mx < larrow.w + larrow.x
			&& my > larrow.y
			&& my < larrow.h + larrow.y){
			me.dir = -1;
			me.update();
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
