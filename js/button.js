class Button {

    constructor(text, bgColor, fontColor, callback){
        this.text = text;
        this.bgColor = bgColor;
        this.fontColor = fontColor;
        this.callback = callback;
    }

    draw(ctx, x, y, width, height){
        const currentFillStyle = ctx.fillStyle;

        ctx.fillStyle = this.bgColor;
        ctx.fillRect(x,y,width,height);
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.text, x+width/2-ctx.measureText(this.text).width/2, y+parseInt(ctx.font) * 1);

        ctx.fillStyle = currentFillStyle; // Reset original fill style
    }
}

class MenuManager{

    /* TODO: Run button's callback function on click */

    constructor(){
        this.buttons = [];
        this.spacing = 70;

        this.canvasWidth = virtualWidth/2;
        this.canvasHeight = virtualHeight/2;
        this.startingX = virtualWidth/2-(this.canvasWidth/2);
        this.startingY = virtualHeight/2-(this.canvasHeight/2);
    }

    draw(ctx){

        // Draw background
        ctx.fillRect(
            this.startingX, this.startingY,
            this.canvasWidth, this.canvasHeight
        );

        // Draw all buttons
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(ctx, this.startingX, this.startingY+(this.spacing * i), this.canvasWidth, 40);
            this.buttons[i].callback();
        }
        
    }
}