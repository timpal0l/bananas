/* A cog class */
var isDrag = false;

var mx, my; // mouse coordinates
var mySel; 
var offsetx, offsety;


function Box() {
  this.x = 0;
  this.y = 0;
  this.w = 1; // default width and height?
  this.h = 1;
  this.fill = '#444444';
}

function addRect(x, y, w, h, fill) {
  var rect = new Box;
  rect.x = x;
  rect.y = y;
  rect.w = w
  rect.h = h;
  rect.fill = fill;
  boxes.push(rect);
}

function myMove(e){
  if (isDrag){
    getMouse(e);
    
    mySel.x = mx - offsetx;
    mySel.y = my - offsety;   
    
  }
}

function hitBox(e){
	  getMouse(e);
	  var l = boxes.length;
	  for (var i = l-1; i >= 0; i--) {
	    // draw shape onto ghost context
	    drawshape(gpctx, boxes[i], 'black');
	    
	    // get image data at the mouse x,y pixel
	    var imageData = gpctx.getImageData(mx, my, 1, 1);
	    var index = (mx + my * imageData.width) * 4;
	    
	    // if the mouse pixel exists, select and break
	    if (imageData.data[3] > 0) {
	      mySel = boxes[i];
	      offsetx = mx - mySel.x;
	      offsety = my - mySel.y;
	      mySel.x = mx - offsetx;
	      mySel.y = my - offsety;
	      isDrag = true;
	      canvas.onmousemove = myMove;
	      return;
	    } 
	  }
  // havent returned means we have selected nothing
  mySel = null;
}

function myDown(e){
	mouse = e;
  	mousePressed = true;
}

function myUp(){
  isDrag = false;
  canvas.onmousemove = null;
}

function getMouse(e) {
      var element = canvas, offsetX = 0, offsetY = 0;

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }


      mx = e.pageX - offsetX;
      my = e.pageY - offsetY;
}

function myMove(e){
  if (isDrag){
    getMouse(e);
    
    mySel.x = mx - offsetx;
    mySel.y = my - offsety;   
    
  }
}

function drawRects() {
	var l = boxes.length;
    for (var i = 0; i < l; i++) {
        drawshape(context, boxes[i], boxes[i].fill);
    }
}


function Cog(shape, x, y, height, width, direction, speed, color) {

	this.shape = shape;
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.direction = direction;
	this.speed = speed;
	this.color = color; // for example '#444444'

	this.draw = function() {

    // Add stuff you want drawn in the background all the time here
    
    // draw all boxes
    var l = boxes.length;
    for (var i = 0; i < l; i++) {
        drawshape(ctx, boxes[i], boxes[i].fill);
    }

	}
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
/*
// Setters
cog.prototype.setShape = function(arg) {
	this.shape = arg;
};

cog.prototype.setX = function(arg) {
	this.x = arg;
};

cog.prototype.setY = function(arg) {
	this.y = arg;
};

cog.prototype.setHeight = function(arg) {
	this.height = arg;
};

cog.prototype.setWidth = function(arg) {
	this.width = arg;
};

cog.prototype.setDirection = function(arg) {
	this.direction = arg;
};

cog.prototype.setSpeed = function(arg) {
	this.speed = arg;
};

cog.prototype.setColor = function(arg) {
	this.color = arg;
};

// Getters

cog.prototype.getShape = function() {
	return this.shape;
};

cog.prototype.getX = function() {
	return this.x;
};

cog.prototype.getY = function() {
	return this.y;
};

cog.prototype.getHeight = function() {
	return this.height;
};

cog.prototype.getWidth = function() {
	return this.width;
};

cog.prototype.getDirection = function() {
	return this.direction;
};

cog.prototype.getSpeed = function() {
	return this.speed;
};

cog.prototype.getColor = function() {
	return this.color;
};
*/