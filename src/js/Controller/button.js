function Button(img, x, y, w, h, toolTipText) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
    this.enlarged = false;
    this.originalW = w;
    this.originalH = h;
    this.originalOuterRadius = 0;
    this.originalInnerRadius = 0;
    this.originalMidRadius = 0;
    this.toolTipText = toolTipText;
    this.toolTip = null;
    this.showTT = false;
    this.visible = true;

    if (img instanceof Cog){ // If the button is a cog instead of an image
        this.originalOuterRadius = img.outerRadius; // Use the cogs parameters
        this.originalInnerRadius = img.innerRadius;
        this.originalMidRadius = img.midRadius;
        img.x = x + img.outerRadius;
        img.y = y + img.outerRadius;
    }

    /*
     * The buttons draw function.
     */

	this.draw = function() {
        if (this.visible){
            if (img instanceof Cog){ // If it's a cog, use the cogs draw method
                this.img.draw(context);
            }else { // Otherwise draw image
                drawImg(this.img, this.x, this.y, this.w, this.h);
            }
            if (this.showTT == true && this.toolTip != null) { // Show tooltip textbox if mouse is over button
                this.toolTip.draw(context);
            }
        }


	};

	/*
	 * Toggle mouseover feedback, i.e. feedback that the mouse is over it.
	 */

	this.toggle = function() {
		if (this.enlarged) { // If the button is enlarged, make it smaller
			if (this.img instanceof Cog) { // Special case for cog
				this.img.outerRadius = this.originalOuterRadius;
				this.img.innerRadius = this.originalInnerRadius;
				this.img.midRadius = this.originalMidRadius;
			} else {
				this.w = this.originalW;
				this.h = this.originalH;
			}

		} else { // If the button isn't enlarged, make it bigger
			if (this.img instanceof Cog) {
				this.img.outerRadius *= 1.06;
				this.img.innerRadius *= 1.06;
				this.img.midRadius *= 1.06;
			} else {
				this.w *= 1.1;
				this.h *= 1.1;
			}
		}
	};
}
