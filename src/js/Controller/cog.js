/* A cog class */

//var time = (new Date()).getTime();
function Box(x, y, w, h, fill) {
	this.x = x;
	this.y = y;
	this.w = w;
	// default width and height?
	this.h = h;
	this.fill = fill;

	this.drawBox = function() {
		drawShape(context, this, this.fill);
	};
}

function Cog(config) {
	this.x = config.x;
	this.y = config.y;
	this.outerRadius = config.outerRadius;
	this.innerRadius = config.innerRadius;
	this.midRadius = config.midRadius;
	this.holeRadius = config.holeRadius;
	this.numTeeth = config.numTeeth;
	this.theta = config.theta;
	this.thetaSpeed = config.thetaSpeed / 1000;
	this.lightColor = config.lightColor;
	this.darkColor = config.darkColor;
	this.clockwise = config.clockwise;
}

/*
 * cog draw method
 */

// @TODO
// Put this code in our drawShape function? a.k.a expanding it!
Cog.prototype.draw = function(ctx) {
	var context = ctx;

	context.save();
	var numPoints = this.numTeeth * 2;

	// cog body gradient
	var grd = context.createLinearGradient(this.x - 100, this.y - 100,
			this.x + 100, this.y + 100);
	grd.addColorStop(0, this.lightColor);
	grd.addColorStop(1, this.darkColor);

	drawCogShape(context, this, numPoints, grd);

};
