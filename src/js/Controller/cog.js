/* A cog class */

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
 * Data about the CogWheel is sent to our drawCogShape function that is located
 * in our view-class.
 */

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
