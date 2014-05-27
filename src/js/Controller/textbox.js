function TextBox(text, x, y) {
	this.text = text;
	this.x = x;
	this.y = y;
	this.maxWidth = 150;
	this.lineHeight = 15;

	this.draw = function() {
		drawTextBox(this);
	};

}