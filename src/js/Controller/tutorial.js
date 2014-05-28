/**
 * Created by jonatanmoritz on 2014-05-28.
 */


function Tutorial(ctx){
    this.tutcanvas = document.createElement('canvas');
    this.tutctx = this.tutcanvas.getContext('2d');
    this.tutcanvas.height = HEIGHT;
    this.tutcanvas.width = WIDTH;
    this.context = ctx;

    this.blurContext = function() {

        this.context.globalAlpha = 0.2;
        this.context.fillStyle = 'gray';
        this.context.fillRect(0,0,WIDTH,HEIGHT);
        this.image = this.context.getImageData(0,0,WIDTH,HEIGHT);
        var d = this.image.data;
        for (var i=0; i<d.length; i+=4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
        }
        var img = this.convolute(this.image,[1/9,1/9,1/9,1/9, 1/9,1/9,1/9,1/9, 1/9,1/9,1/9,1/9],0);
        this.tutctx.putImageData(img,0,0);
        this.context.globalAlpha = 1;
    }

    this.createImageData = function(w,h) {
        return this.tutctx.createImageData(w,h);
    }


    this.convolute = function(pixels, weightsVector, opaque){

        var side = weightsVector.length;
        var halfSide = Math.floor(side/2);

        var src = pixels.data;
        var sw = pixels.width;
        var sh = pixels.height;

        var w = sw;
        var h = sh;
        var output = this.createImageData(w, h);
        var dst = output.data;

        var alphaFac = opaque ? 1 : 0;

        for (var y=0; y<h; y++) {
            for (var x=0; x<w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y*w+x)*4;
                var r=0, g=0, b=0, a=0;
                for (var cx=0; cx<side; cx++) {
                    var scy = sy;
                    var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy*sw+scx)*4;
                    var wt = weightsVector[cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff+1] * wt;
                    b += src[srcOff+2] * wt;
                    a += src[srcOff+3] * wt;
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac*(255-a);
            }
        }
        return output;
    }


}