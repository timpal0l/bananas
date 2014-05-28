/* This is where all data objects are stored, accessed, and modified. */

cogs = [];
redoCogs = [];
buttons = [];

var cogEngine = new Cog({
	x : 650,
	y : 105,
	outerRadius : 90,
	innerRadius : 50,
	midRadius : 80,
	holeRadius : 10,
	numTeeth : 24,
	theta : 0,
	thetaSpeed : 1000,
	lightColor : '#FFFFFF',
	darkColor : '#111111',
	clockwise : false,
	engine : true,
    connected : true,
    parent : null
});