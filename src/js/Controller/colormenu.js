function Colormenu(height, width, b){
	
	this.h = height;
	this.w = width;
	this.bendA = b;
	this.startx = 150;
	this.starty = 300;
	
	this.draw = function(){ 
		drawCmenu(this);
		};

}
