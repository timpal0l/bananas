function Menu(height,width,bendAngle) {
	
	//Angle on the rounded corner
	this.bendAngle = bendAngle;
	
	//The width of the canvas divided by a number, the bigger the number he closer to the edge
	this.widthSplit = width;
	
	this.w = (WIDTH/this.widthSplit)
	this.h = HEIGHT - height;
	
	
}

function animate(bottomMenu,dir){
	// update
    var linearSpeed = 5;
     
    if (dir > 0) {
    	dir = (bottomMenu.h > HEIGHT) ? 0 : 1;
    }   
   
    // Move
    bottomMenu.h += linearSpeed * dir; 

    // clear
    context.clearRect(0, 0, WIDTH, HEIGHT);

    drawMenu(bottomMenu);

    // request new frame
    requestAnimFrame(function() {
    	animate(bottomMenu,dir);
        });
}	

function moveMenuDown(speed){
	
	
	
}