/* A cog class */

function cog(shape, size, direction, speed) {

	this.shape = shape;
	this.size = size;
	this.direction = direction;
	this.speed = speed;
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

cog.prototype.setShape = function(arg) {
	this.shape = arg;
};

cog.prototype.setSize = function(arg) {
	this.shape = arg;
};

cog.prototype.setDirection = function(arg) {
	this.shape = arg;
};

cog.prototype.setSpeed = function(arg) {
	this.shape = arg;
};

cog.prototype.getShape = function() {
	return this.shape;
};

cog.prototype.getSize = function() {
	return this.size;
};

cog.prototype.getDirection = function() {
	return this.direction;
};

cog.prototype.getSpeed = function() {
	return this.speed;
};