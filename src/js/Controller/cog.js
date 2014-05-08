/* A cog class */



function Box(x, y, w, h, fill) {
  this.x = x;
  this.y = y;
  this.w = w; // default width and height?
  this.h = h;
  this.fill = fill;

  this.drawBox = function() {
  	drawshape(context, this, this.fill);
  };
}










function Cog(shape, x, y, height, width, direction, speed, color) {

	this.shape = shape;
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.direction = direction;
	this.speed = speed;
	this.color = color; // for example '#444444'

	this.draw = function() {

	    // Add stuff you want drawn in the background all the time here
	    
	    // draw all boxes
	    var l = boxes.length;
	    for (var i = 0; i < l; i++) {
	        drawshape(ctx, boxes[i], boxes[i].fill);
	    }

	};
}

/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
/*
// Setters
cog.prototype.setShape = function(arg) {
	this.shape = arg;
};

cog.prototype.setX = function(arg) {
	this.x = arg;
};

cog.prototype.setY = function(arg) {
	this.y = arg;
};

cog.prototype.setHeight = function(arg) {
	this.height = arg;
};

cog.prototype.setWidth = function(arg) {
	this.width = arg;
};

cog.prototype.setDirection = function(arg) {
	this.direction = arg;
};

cog.prototype.setSpeed = function(arg) {
	this.speed = arg;
};

cog.prototype.setColor = function(arg) {
	this.color = arg;
};

// Getters

cog.prototype.getShape = function() {
	return this.shape;
};

cog.prototype.getX = function() {
	return this.x;
};

cog.prototype.getY = function() {
	return this.y;
};

cog.prototype.getHeight = function() {
	return this.height;
};

cog.prototype.getWidth = function() {
	return this.width;
};

cog.prototype.getDirection = function() {
	return this.direction;
};

cog.prototype.getSpeed = function() {
	return this.speed;
};

cog.prototype.getColor = function() {
	return this.color;
};
*/