class Player {
    constructor(coordinates, controls) {
        this.name = "Unknown Player";
        this.width = 70;
        this.height = 112;
        this.controls = controls;
        this.moveSpeed = 2;

        this.startX = coordinates[0];
        this.startY = coordinates[1];
        this.score = 0;
        this.enemys = [];
        this.maxAmmo  = 100;

        this.timeSinceLastBullet = 0;
        this.fireRate = tickRate*10;

        // Variables reset each round
        this.reset();
    }
        
    /**
     * Reset variables after each round
     */
    reset(){
        this.x = this.startX;
        this.y = this.startY;

        this.dx = 0;
        this.dy = 0;

        this.bullets = [];
        this.ammo    = this.maxAmmo;
        this.health  = 100;
    }
    
    /**
     * Responce to bullet collision
    */
    takeDamage(){
        this.justHit = true;
        this.health -= 10;
    }

    /**
     * Give player's name when converting to string
     */
    toString(){
        return this.name;
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

        // Spawn new bullet
        else if (keyCode == this.controls.fire) {
            if(this.ammo > 0){ // Does the player have ammo?
                if(this.timeSinceLastBullet >= this.fireRate){ // Has their been time between last bullet fire
                    this.bullets.push(new Bullet(this));
                    this.ammo--;
                    this.timeSinceLastBullet = 0;
                }
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
        this.timeSinceLastBullet += tickRate;

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
        
        //Update the players bullets
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