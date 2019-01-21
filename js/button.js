class Button {

    constructor(title, x, y, width, height, bgColor, fontColor){
        this.title     = title;
        this.x         = x;
        this.y         = y;
        this.width     = width;
        this.height    = height;
        this.path      = new Path2D();
        this.bgColor   = bgColor;
        this.fontColor = fontColor;

        this.path.rect(x,y,width,height);
        this.path.closePath();
    }

    draw(ctx){
        ctx.fillStyle = this.bgColor;
        ctx.fill(this.path);
        ctx.fontColor = this.fontColor;
        ctx.fillText(this.title, this.x-ctx.measureText(this.title)/2, this.y);
    }

}