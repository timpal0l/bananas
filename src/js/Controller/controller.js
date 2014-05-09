function Menu(height, width, bendAngle) {

    // Angle on the rounded corner
    this.bendAngle = bendAngle;

    // The width of the canvas divided by a number, the bigger the number the
    // closer to the edge
    this.widthSplit = width;

    this.w = (WIDTH / this.widthSplit);
    this.h = HEIGHT - height;

    // Moving direction
    this.dir = 0;

    // Moving speed
    this.linearSpeed = 5;

    this.drawMenu = function() {
        drawMenu(this);

    };
    //this.pos = "show";
    this.drawSideMenu = function() {
        drawSideMenu(this);
    };

    // Update the position of the menu
    this.update = function() {

        if (this.dir > 0) {
            this.dir = (this.h > HEIGHT) ? 0 : 1;
        }

        // Move
        this.h += this.linearSpeed * this.dir;
    };
}