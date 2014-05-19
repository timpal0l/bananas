function Colormenu(height, width, b){
	
	this.h = height;
	this.w = width;
	this.bendA = b;
	this.startx = 0;
	this.starty = 470;
	
	this.draw = function(){ 
		drawCmenu(this);
		};

}
