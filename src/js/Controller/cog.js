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

//@TODO
// Put this code in our drawShape function? a.k.a expanding it!

Cog.prototype.draw = function() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    context.save();
    var numPoints = this.numTeeth * 2;
    // draw cog teeth
    context.beginPath();
    context.lineJoin = 'bevel';

    for (var n = 0; n < numPoints; n++) {

        var radius = null;

        if (n % 2 == 0) {
            radius = this.outerRadius;
        } else {
            radius = this.innerRadius;
        }

        var theta = this.theta;
        theta += ((Math.PI * 2) / numPoints) * (n + 1);

        var x = (radius * Math.sin(theta)) + this.x;
        var y = (radius * Math.cos(theta)) + this.y;

        if (n == 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    }

    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = this.darkColor;
    context.stroke();

    // draw cog body
    context.beginPath();
    context.arc(this.x, this.y, this.midRadius, 0, 2 * Math.PI, false);

    var grd = context.createLinearGradient(this.x - 100, this.y - 100, this.x + 100, this.y + 100);
    grd.addColorStop(0, this.lightColor);
    grd.addColorStop(1, this.darkColor);
    context.fillStyle = grd;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = this.darkColor;
    context.stroke();

    // draw cog hole
    context.beginPath();
    context.arc(this.x, this.y, this.holeRadius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.strokeStyle = this.darkColor;
    context.stroke();
    context.restore();
};
