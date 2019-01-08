class Bullet {
    constructor(player) {
        this.x = player.x + player.width/2;
        this.y = player.y + (player.height/3)*2;

        this.width = 10;
        this.height = 10;

        this.color = "yellow";

        this.currentDistance = 0;
        this.maxDistance = tickRate * 20;
        this.destroy = false
        
        this.dx = player.dx * 10;
        this.dy = player.dy * 10;

        // If the player isn't moving, then
        // give the bullet a default velocity
        if (this.dx == 0 && this.dy == 0) {
            this.dy = 25;
        }
    }
    
    /** 
    * Check if bullet hit player
    */
    hit(player){ 
        if(this.x > player.x && this.x < player.x + player.width &&
            this.y > player.y && this.y < player.y + player.height){
                return true;
        } return false;
    }

    /**
     * Moves the bullet through the world
     */
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.currentDistance += tickRate;

        // Bullet fade
        if(this.currentDistance >= this.maxDistance){
            this.destroy = true;
        }
    }

    /**
     * Draws the bullet on the canvas
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}