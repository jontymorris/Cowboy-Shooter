class Bullet {
    constructor(player) {
        this.x = player.x + player.width/2;
        this.y = player.y + player.height/2;

        this.width = 10;
        this.height = 10;

        this.color = "yellow";
        
        this.dx = player.dx * 10;
        this.dy = player.dy * 10;

        // If the player isn't moving, then
        // give the bullet a default velocity
        if (this.dx == 0 && this.dy == 0) {
            this.dy = 25;
        }
    }

    /**
     * Moves the bullet through the world
     */
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    /**
     * Draws the bullet on the canvas
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}