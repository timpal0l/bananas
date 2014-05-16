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
	this.originalLight = config.lightColor;
	this.originalDark = config.darkColor;
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

Cog.prototype.checkHit = function(ctx) {
	var l = cogs.length;
	for (var i = l-1; i >= 0; i--) {
		if (this !== cogs[i]) {
			var dx = Math.abs(this.x - cogs[i].x);
			var dy = Math.abs(this.y - cogs[i].y);
			var dist = Math.sqrt(dx * dx + dy * dy) - this.outerRadius - cogs[i].midRadius;
			if (dist < 5) { // since linewidth = 5
				//cogs[i].lightColor = "#C0C0C0";
			//	cogs[i].darkColor = "#808080";
                cogctx.globalAlpha = 0.5;
				//alert("krock");
			} else{
				//cogs[i].lightColor = cogs[i].originalLight;
				//cogs[i].darkColor = cogs[i].originalDark;
                cogctx.globalAlpha = 1.0;
			};

		} else {

		};
	};
};