function Button(img, x, y, w, h) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = function() {
		drawImg(this.img, this.x, this.y, this.w, this.h);
	};
}