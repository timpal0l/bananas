// // /* This is where all data objects are stored, accessed, and modified. */
// cogs = [];
// 
// function addCog(config) {
// 
// // this is hardcoded atm, the specific data about the cog should ofcourse
// // come from the user.
// 
// var blueCog = new Cog({
// x : 400, //shoud look like x : config.x
// y : 200, //shoud look like x : config.y
// outerRadius : 90, //shoud look like outerRadius : config.outerRadius ETC
// innerRadius : 50,
// midRadius : 80,
// holeRadius : 10,
// numTeeth : 24,
// theta : 0,
// thetaSpeed : 1,
// lightColor : '#B1CCFF',
// darkColor : '#3959CC',
// clockwise : false
// });
//     
// cogs.push(blueCog);
// }

var cog1 = new Cog({
	x : 420,
	y : 205,
	outerRadius : 90,
	innerRadius : 50,
	midRadius : 80,
	holeRadius : 10,
	numTeeth : 24,
	theta : 0,
	thetaSpeed : 200,
	lightColor : '#AAAAAA',
	darkColor : '#3959CC',
	clockwise : false
});

var cog2 = new Cog({
	x : 522,
	y : 290,
	outerRadius : 50,
	innerRadius : 15,
	midRadius : 40,
	holeRadius : 10,
	numTeeth : 12,
	theta : 0.14,
	thetaSpeed : 400,
	lightColor : '#FF9E9D',
	darkColor : '#AD0825',
	clockwise : true
});