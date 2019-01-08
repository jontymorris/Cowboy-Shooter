class Player {
    constructor(x, y, controls) {
        this.x = x;
        this.y = y;

        this.width = 70;
        this.height = 112;

        this.controls = controls;

        this.moveSpeed = 2;
        this.dx = 0;
        this.dy = 0;

        this.bullets = [];
        this.score   = 0;
        this.ammo    = 100;
        this.health  = 100;
        this.enemys  = [];
    }

    /**
     * Process the key being pressed down
     */
    keyDown(keyCode) {
        // handle movement controls
        if (keyCode == this.controls.right) {
            this.dx = this.moveSpeed;
        }
        else if (keyCode == this.controls.left) { 
            this.dx = -this.moveSpeed;
        }
        else if (keyCode == this.controls.up) { 
            this.dy = -this.moveSpeed;
        }
        else if (keyCode == this.controls.down) { 
            this.dy = this.moveSpeed;
        }

        // handle a bullet fire
        else if (keyCode == this.controls.fire) {
            if(this.ammo > 0){ // Does the player have ammo?
                this.bullets.push(new Bullet(this));
                this.ammo--;
            }
        }
    }

    /**
     * Process the key being released
     */
    keyUp(keyCode) {
        // handle movement controls
        if (keyCode == this.controls.right && this.dx == this.moveSpeed) {
            this.dx = 0;
        }
        else if (keyCode == this.controls.left && this.dx == -this.moveSpeed) { 
            this.dx = 0;
        }
        else if (keyCode == this.controls.up && this.dy == -this.moveSpeed) { 
            this.dy = 0;
        }
        else if (keyCode == this.controls.down && this.dy == this.moveSpeed) { 
            this.dy = 0;
        }
    }

    /**
     * Updates the players movement and all their bullets
     */
    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Check if the player has moved off the screen
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + this.width > virtualWidth) {
            this.x = virtualWidth - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y + this.height > virtualHeight) {
            this.y = virtualHeight - this.height;
        }

        // Bullet destroying
        if(this.bullets.length > 0){
            if(this.bullets[0].destroy){
                this.bullets.shift();
            }
        }
 
        // Update the players bullets
        for (let i=0; i < this.bullets.length; i++) {
            if(this.enemys.length > 0){
                for (let index = 0; index < this.enemys.length; index++) {
                    if(this.enemys[index].health > 0){
                        if(this.bullets[i].hit(this.enemys[index])){
                            this.bullets[i].destroy = true;
                            this.enemys[index].takeDamage();
                        }
                    }
                }
            }
            this.bullets[i].update();
        }
    }

    // Responce to bullet collision
    takeDamage(){
        this.justHit = true;
        this.health -= 10;
    }

    die(){
        // TODO: Implement dieing (not be able to be hit any longer and don't render)
    }

    /**
     * Draws the player and all their bullets
     */
    draw(ctx) {
        // Blood FX
        if(this.justHit){
            ctx.drawImage(bloodImage, this.x, this.y, this.width, this.height);
            this.justHit = false;
        }

        // Draw the bullets
        for (let i=0; i<this.bullets.length; i++) {
            this.bullets[i].draw(ctx);
        }

        if(this.health > 0){ // Is player alive?
            // Draw the player in the direction they're facing
            if (this.dx < 0) {
                ctx.drawImage(leftImage, this.x, this.y, this.width, this.height);
            }
            else if (this.dx > 0) {
                ctx.drawImage(rightImage, this.x, this.y, this.width, this.height);
            }
            else if (this.dy < 0) {
                ctx.drawImage(upImage, this.x, this.y, this.width, this.height);
            }
            else {
                ctx.drawImage(downImage, this.x, this.y, this.width, this.height);
            }
        }   
    }
}