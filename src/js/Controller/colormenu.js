function Colormenu(height, width, b){
	
	this.h = height;
	this.w = width;
	this.bendA = b;
	this.startx = 200;
	this.starty = 450;
	
	this.draw = function(){ 
		drawCmenu(this);
		};

}
