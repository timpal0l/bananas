/* The cog class */

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
    this.parent = config.parent;
    this.visible = config.visible;
}

/*
 * Data about the CogWheel look is sent to our drawCogShape function that is
 * located in our view-class.
 */

Cog.prototype.draw = function(ctx) {
	if (this.visible){
        var context = ctx;

        context.save();
        var numPoints = this.numTeeth * 2;

        // Set cog body gradient
        var grd = context.createLinearGradient(this.x - 100, this.y - 100,
                this.x + 100, this.y + 100);
        grd.addColorStop(0, this.lightColor);
        grd.addColorStop(1, this.darkColor);
        drawCogShape(context, this, numPoints, grd);
    }

};
/*
 * checkParent is used to see if the parent cogwheel, i.e. the one
 * this cogwheel was connected to. The idea is to have a chain of
 * connected cogwheels, and if a link in the middle is pulled put
 * all cogwheels no longer connected in a chain to the engine stop
 * spinning.
 */
Cog.prototype.checkParent = function() {
	if (this.parent != null) {
		if (this.parent.connected == true) {
			this.clockwise = (this.parent.clockwise == true ? false : true);
			this.thetaSpeed = 0.002;
            this.connected = true;
		} else{
			this.parent = null;
			cogctx.globalAlpha = 1.0;
			this.thetaSpeed = 0;
            this.connected = false;
		}
	} 
};

/*
 * This function loops through all cogwheels on the canvas to see if 
 * the cogwheel we are currently dragging is connected to any of the 
 * other cogwheels.
 */

Cog.prototype.checkHit = function(ctx) {
	var l = cogs.length;
	for (var i = l - 1; i >= 0; i--) {
		if (this !== cogs[i]) {
			var dx = this.x - cogs[i].x; // Get x and y coordinates relative to the other cogwheel 
			var dy = this.y - cogs[i].y;
			var absdx = Math.abs(dx);
			var absdy = Math.abs(dy);
			var dist = Math.sqrt(absdx * absdx + absdy * absdy) - this.outerRadius
					- cogs[i].midRadius; // Calculate distance to other cogwheel

			if (dist < 1) { 

				theta = Math.atan2(dy, dx); // Calculate in what angle our cogwheel should be pushed back
				var r = Math.abs(dist) + 2; // Distance to move, a few pixels extra to avoid getting stuck

				var deltax = r*Math.cos(theta); // Calculate how much x and y values should be increased/decreased
				var deltay = r*Math.sin(theta);
				this.x += deltax;
				this.y += deltay;

				cogctx.globalAlpha = 0.5; // Make cogwheel transparent

				if (cogs[i].engine == true || cogs[i].connected == true) { 
					// We are connected to a spinning wheel. Start spinning in opposite direction
					this.clockwise = (cogs[i].clockwise == true ? false : true);
					this.thetaSpeed = 0.002;
                    this.connected = true;
                    this.parent = cogs[i]; // Remember who we were first connected to, it's our parent
                    
				}
                world.myUp(); // Release the mousepress so the cogwheel is dropped, and break
                return;

			} else { // We are not close to any cogwheel, stop spinning
				cogctx.globalAlpha = 1.0;
                this.thetaSpeed = 0;
                this.connected = false;
                this.parent = null;

                cogs[i].checkParent(); // Always check if the cogwheels parent is spinning
                

			};
		}
	};
};
