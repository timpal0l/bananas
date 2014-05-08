/* This is where all data objects are stored, accessed, and modified. */
cogs = [];


function addCog(shape, x, y, height, width, direction, speed, color) {
  var cog = new Cog(shape, x, y, height, width, direction, speed, color);
  cogs.push(cog);
}

