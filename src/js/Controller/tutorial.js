/**
 * Created by jonatanmoritz on 2014-05-28.
 */


function Tutorial(ctx){
    this.tutcanvas = document.createElement('canvas');
    this.tutctx = this.tutcanvas.getContext('2d');
    this.tutcanvas.height = HEIGHT;
    this.tutcanvas.width = WIDTH;

    this.tuttextcanvas = document.createElement('canvas');
    this.tuttextctx = this.tuttextcanvas.getContext('2d');
    this.tuttextcanvas.height = HEIGHT;
    this.tuttextcanvas.width = WIDTH;

    this.context = ctx;

    this.storyCounter = 0;



    this.tutClick = function(e){
        for (i = 0; i < tutorialButtons.length; i++){
            tutorialButtons[i].myClick(e);
            if (tutorialButtons[i].clicked) {
                if (tutorialButtons[i].option == "next"){
                    this.next();
                }else if (tutorialButtons[i].option == "quit"){
                    this.endTutorial();

                }
            }
        }

    }

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

        this.tutctx.putImageData(this.image,0,0);
        this.context.globalAlpha = 1;
    }

    this.draw = function(){
        for (i = 0; i < tutorialTextBoxes.length; i++){
            tutorialTextBoxes[i].draw(this.tuttextctx);
        }
        for (i = 0; i < tutorialButtons.length; i++){
            tutorialButtons[i].draw();
        }
    }

    this.startStory = function(value){

            for (i = 0; i < cogs.length; i++){
                if(cogs[i].engine == true) {
                    cogs[i].visible = false;
                }

            }
            this.storyCounter = 1;
            var startText = "Hello and welcome to the tutorial!" + " \n \n " +
                "You can exit the tutorial any time by clicking the question mark or the x in the right corner." + " \n \n " +
                "Continue by clicking the button."

            var startTT = new TextBox(startText,WIDTH/3,HEIGHT/5);
            startTT.maxWidth = 350;
            startTT.padding = 100;
            tutorialTextBoxes.push(startTT);

            var nextButton = new RectButton(WIDTH/3 + startTT.maxWidth/5*4,HEIGHT/5 + 170,50,30,"#80B2FF","Next","next",this.tuttextcanvas);
            tutorialButtons.push(nextButton);



    }

    this.next = function(){
        switch (this.storyCounter){
            case 1:
                this.removeAll();
                this.cogWheelHelp();
                break;
            case 2:
                this.removeAll();
                this.redoUndoHelp();
                break;
            case 3:
                this.removeAll();
                this.colorHelp();
                break;
        }

    }
    this.cogWheelHelp = function(){
        this.storyCounter = 2;
        var addCogWheelText = "To add a cog wheel to the surface, click the cog wheel in the side menu on the left"
        var tB = new TextBox(addCogWheelText,WIDTH/3,HEIGHT/2);
        tB.maxWidth = 350;
        tB.padding = 100;
        tutorialTextBoxes.push(tB);

        var nextButton = new RectButton(WIDTH/3 + tB.maxWidth/5*4,HEIGHT/5 + 300,50,30,"#80B2FF","Next","next",this.tuttextcanvas);
        tutorialButtons.push(nextButton);


        this.context.clearRect(0,0,WIDTH,HEIGHT);
        this.tutctx.clearRect(0,0,WIDTH,HEIGHT);
        world.sideMenu.cogButton.visible = false;

        world.draw();
        this.blurContext();
        world.sideMenu.cogButton.visible = true;
        for (i = 0; i < cogs.length; i++) {
            if (cogs[i].engine == true) {
                cogs[i].visible = true;
            }
        }
        //this.tutctx.clearRect((world.sideMenu.wi / 2) - 55, ((world.sideMenu.he /4) - 55) + world.sideMenu.starty / 2, 100, 100);


    }
    this.redoUndoHelp = function(){
        this.storyCounter = 3;

        var addCogWheelText = "To undo or redo use the arows in the side menu"
        var tB = new TextBox(addCogWheelText,WIDTH/3,HEIGHT/2);
        tB.maxWidth = 350;
        tB.padding = 100;
        tutorialTextBoxes.push(tB);

        var nextButton = new RectButton(WIDTH/3 + tB.maxWidth/5*4,HEIGHT/5 + 300,50,30,"#80B2FF","Next","next",this.tuttextcanvas);
        tutorialButtons.push(nextButton);

        world.sideMenu.cogButton.visible = true;
        for (i = 0; i < cogs.length; i++) {
            if (cogs[i].engine == true) {
                cogs[i].visible = false;
            }
        }
        this.context.clearRect(0,0,WIDTH,HEIGHT);
        this.tutctx.clearRect(0,0,WIDTH,HEIGHT);
        world.sideMenu.undoButton.visible = false;
        world.sideMenu.redoButton.visible = false;

        world.draw();
        this.blurContext();

        world.sideMenu.undoButton.visible = true;
        world.sideMenu.redoButton.visible = true;
        world.sideMenu.cogButton.visible = true;

        for (i = 0; i < cogs.length; i++) {
            if (cogs[i].engine == true) {
                cogs[i].visible = true;
            }
        }
    }

    this.colorHelp = function(){
        this.storyCounter = 4;

        var addCogWheelText = "To change color of the cog wheel just simply click the paint brush and choose a color of your choice"
        var tB = new TextBox(addCogWheelText,WIDTH/3,HEIGHT/2);
        tB.maxWidth = 350;
        tB.padding = 100;
        tutorialTextBoxes.push(tB);

        var nextButton = new RectButton(WIDTH/3 + tB.maxWidth/5*4,HEIGHT/5 + 300,50,30,"#80B2FF","Exit","quit",this.tuttextcanvas);
        tutorialButtons.push(nextButton);

        world.sideMenu.cogButton.visible = true;
        for (i = 0; i < cogs.length; i++) {
            if (cogs[i].engine == true) {
                cogs[i].visible = false;
            }
        }
        this.context.clearRect(0,0,WIDTH,HEIGHT);
        this.tutctx.clearRect(0,0,WIDTH,HEIGHT);
        world.sideMenu.brushButton.visible = false;
        world.sideMenu.cogButton.visible = false;

        world.draw();
        this.blurContext();

        world.sideMenu.brushButton.visible = true;
        world.sideMenu.cogButton.visible = true;

        for (i = 0; i < cogs.length; i++) {
            if (cogs[i].engine == true) {
                cogs[i].visible = true;
            }
        }
    }


    this.removeAll = function(){
        tutorialTextBoxes = [];
        tutorialButtons = [];
    }

    this.endTutorial = function(){
        world.tutOn = false;
        this.context.clearRect(0,0,WIDTH,HEIGHT);
        this.tutctx.clearRect(0,0,WIDTH,HEIGHT);
        this.removeAll();
        this.storyCounter = 0;
        for (i = 0; i < cogs.length; i++) {
            if (cogs[i].engine == true) {
                cogs[i].visible = true;
            }
        }
    }

}