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

    if (img instanceof Cog){
        this.originalOuterRadius = img.outerRadius;
        this.originalInnerRadius = img.innerRadius;
        this.originalMidRadius = img.midRadius;
        img.x = x + img.outerRadius;
        img.y = y + img.outerRadius;
    }

	this.draw = function() {
        if (this.visible){
            if (img instanceof Cog){
                this.img.draw(context);
            }else {
                drawImg(this.img, this.x, this.y, this.w, this.h);
            }
            if (this.showTT == true && this.toolTip != null) {
                this.toolTip.draw(context);
            }
        }


	};

	this.toggle = function() {
		if (this.enlarged) {
			if (this.img instanceof Cog) {
				this.img.outerRadius = this.originalOuterRadius;
				this.img.innerRadius = this.originalInnerRadius;
				this.img.midRadius = this.originalMidRadius;
			} else {
				this.w = this.originalW;
				this.h = this.originalH;
			}

		} else {
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
