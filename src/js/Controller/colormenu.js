function Colormenu(height, width, b){
	
	this.he = height;
	this.wi = width;
	this.bendAngle = b;
	this.startx = -45;
	this.starty = 470;
    this.dir = 0;
	
	this.draw = function(){ 
		drawSideMenu(this);
		};

}
