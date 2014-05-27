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
	this.engine = config.engine;
    this.connected = config.connected;
}

/*
 * Data about the CogWheel look is sent to our drawCogShape function that is
 * located in our view-class.
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
	for (var i = l - 1; i >= 0; i--) {
		if (this !== cogs[i]) {
			var dx = this.x - cogs[i].x
			var dy = this.y - cogs[i].y
			var absdx = Math.abs(dx);
			var absdy = Math.abs(dy);
			var dist = Math.sqrt(absdx * absdx + absdy * absdy) - this.outerRadius
					- cogs[i].midRadius;

			if (dist < 1) { 

				theta = Math.atan2(dy, dx);
				//theta *= 180/Math.PI; //radian to degrees
				// r is the distance to move
				var r = Math.abs(dist) + 2;

				var deltax = r*Math.cos(theta);
				var deltay = r*Math.sin(theta);
				this.x += deltax;
				this.y += deltay;

				cogctx.globalAlpha = 0.5;

				if (cogs[i].engine == true) {
					this.clockwise = (cogs[i].clockwise == true ? false : true);
					this.thetaSpeed = 0.002;
                    this.connected = true;
				} else if (cogs[i].connected == true) {
					this.clockwise = (cogs[i].clockwise == true ? false : true);
					this.thetaSpeed = 0.002;
                    this.connected = true;
				}
                world.myUp();
                return;

			} else {
				cogctx.globalAlpha = 1.0;
                this.thetaSpeed = 0;
                this.connected = false;

			};
		}
	};
};
