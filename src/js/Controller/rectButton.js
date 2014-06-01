/**
 * Created by jonatanmoritz on 2014-06-01.
 */
function RectButton(x,y,w,h,style,text,option,canvas){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.style = style;
    this.me = this;
    this.clicked = false;
    this.text = text;
    this.option = option;


}

RectButton.prototype.draw = function(){
    drawRectButton(this,this.context,this.style);
}

RectButton.prototype.myClick = function(e){
    this.me.getMouse(e);
    if (mx > this.x && mx < this.w + this.x && my > this.y
        && my < this.h + this.y) {
        this.me.clicked = true;
    }
}

RectButton.prototype.getMouse = function(e) {
    var element = canvas, offsetX = 0, offsetY = 0;
    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }
    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;
};