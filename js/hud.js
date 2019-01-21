class Hud {

    constructor(color){
        // Font Settings
        this.fontPrimary        = "30px Arial";
        this.fontSecondary      = "15px Arial";
        this.fontExtra          = "10px Arial";

        // Main HUD Settings
        this.progressBarWidth  = 100;
        this.progressBarHeight = 10;
        this.healthBarColor    = "green";
        this.iconSize          = this.progressBarHeight*2;
        this.color             = color;
        this.buttons           = [];

        // Render for special events
        this.newRound          = false;
        this.gameOver          = false;
        this.isPaused          = false;
        this.renderTime        = tickRate * 100;
        this.currentRenderTime = 0;

        // Create Menu Buttons
        var scaleHeight = 4;
        var scaleWidth  = 3;
        var spacing     = 40;
        this.buttons = [];
        //this.buttons.push(new Button("Resume", x, y, width, height, bgColor, fontColor));
        this.buttons.push(new Button("Quit", (virtualWidth/2), ((virtualHeight/2)-(virtualHeight/scaleHeight)/2 + spacing*2+virtualHeight/(scaleHeight*6)-5), virtualWidth/scaleWidth, virtualHeight/(scaleHeight*6), "gray", "white"));
        // (virtualWidth/2)-(virtualWidth/scaleWidth)/2, ((virtualHeight/2)-(virtualHeight/scaleHeight)/2 + spacing*index), )
        // resumeText,)
    }

    // Pause Menu
    drawPauseMenu(){


        for (let index = 0; index < this.buttons.length; index++) {
            this.buttons[index].draw(ctx);
        }

        ctx.fillRect((this.virtualWidth/2)-(this.virtualWidth/this.scaleWidth)/2, (this.virtualHeight/2)-(this.virtualHeight/this.scaleHeight)/2, this.virtualWidth/this.scaleWidth, this.virtualHeight/this.scaleHeight); // Background
        ctx.fillStyle = "gray";
        ctx.fillText("Paused",(this.virtualWidth/2)-ctx.measureText("Paused").width/2, ((this.virtualHeight/2)-(this.virtualHeight/this.scaleHeight)/2)+this.spacing);



        /* Quit Button
        ctx.fillStyle = "gray";
        const quitPath = new Path2D();
        quitPath.rect((virtualWidth/2)-(virtualWidth/scaleWidth)/2, ((virtualHeight/2)-(virtualHeight/scaleHeight)/2 + spacing*3), virtualWidth/scaleWidth, virtualHeight/(scaleHeight*6));
        quitPath.closePath();
        ctx.fill(quitPath);
        ctx.fillStyle = "white";
        ctx.fillText(quitText,(virtualWidth/2)-ctx.measureText(quitText).width/2, ((virtualHeight/2)-(virtualHeight/scaleHeight)/2 + spacing*3+virtualHeight/(scaleHeight*6)-5));*/

    }

    // Draw Progress Bar
    drawHealthBar(health, x, y){
        ctx.fillRect(x, y, this.progressBarWidth, this.progressBarHeight);              // Background
        ctx.fillStyle = this.healthBarColor;                                            // Change to health bar color
        ctx.fillRect(x, y, health*(this.progressBarWidth/100), this.progressBarHeight); // Health Overlay
        ctx.fillStyle = this.color;                                                     // Revert to normal fill color
    }

    // Get winners and create presentable string for who won
    winnerString(){
        var winnersText = "Game Over!\n";
        var winners      = getWinners();

        for (let index = 0; index < winners.length; index++) {
            winnersText += winners[index].toString();
            if(index < winners.length){
                winnersText += " and ";
            }
        }
        if(winners.length > 1){
            winnersText += "both ";
        }
        winnersText += "won with a \nscore of: " + winners[0].score;
        return winnersText;
    }

    draw(ctx) {
        
        ctx.font       = this.fontPrimary;  // Set main font
        ctx.fillStyle  = this.color;        // Temporarily change fill color

        // Score
        var playersScore = players[0].score + " | " + players[1].score;
        ctx.fillText(playersScore, virtualWidth/2, 50);

        // Players Stats (above each player's head)
        for (let index = 0; index < players.length; index++) {
            // Player variables
            var x = players[index].x;
            var y = players[index].y;
            var name = players[index].name;
            var health = players[index].health;
            var ammo = players[index].ammo; var maxAmmo = players[index].maxAmmo;

            // Player's Name
            ctx.font = this.fontSecondary;
            ctx.fillText(name, x, y - 30);
            
            // Health Bar
            ctx.font = this.fontExtra;
            this.drawHealthBar(health, x, y-20);                                    
            ctx.drawImage(healthImage, x, y-20, this.progressBarHeight, this.progressBarHeight);

            // Ammo stats
            ctx.drawImage(bulletImage,         x-5,             y-10, this.iconSize, this.iconSize);
            ctx.fillText(ammo + "/" + maxAmmo, x+this.iconSize, y+5);
            
            ctx.font = this.fontPrimary; // Revert main font
        }

        /*
        * Overlays
        */

        // New Round Overlay
        if(this.newRound){
            var newRoundText = "New Round!";
            var newRoundTextWidth    = ctx.measureText(newRoundText).width;
            ctx.fillText(newRoundText, (virtualWidth/2)-newRoundTextWidth/3, virtualHeight/2);
            
            this.currentRenderTime += tickRate;
            if(this.currentRenderTime >= this.renderTime){
                this.newRound          = false;
                this.currentRenderTime = 0;
            }
        }

        // Game-Over Overlay
        if(this.gameOver){
            var displayLines = this.winnerString().split("\n");
            var spaceing     = 0;

            // Draw new fill text line for every /n found in winner string
            for (let index = 0; index < displayLines.length; index++) {
                ctx.fillText(displayLines[index], (virtualWidth/2)-ctx.measureText(displayLines[index]).width/2, virtualHeight/2+spaceing);
                spaceing += 40;
            }
            
            this.currentRenderTime += tickRate;
            if(this.currentRenderTime >= this.renderTime * 3){
                this.gameOver          = false;
                this.currentRenderTime = 0;
            }
        }

        // Paused Menu
        this.isPaused = true;
        if(this.isPaused){
            this.drawPauseMenu();
        }
        
        ctx.fillStyle = this.color; // Revert normal fill color 
    }
}