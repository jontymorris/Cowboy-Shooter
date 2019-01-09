class Hud {

    constructor(color){
        // Font Settings
        ctx.font      = "30px Arial";
        this.color    = color;

        this.progressBarWidth  = 200;
        this.progressBarHeight = 30;
        this.healthBarColor = "green";
        this.fillColor = "white";
        this.iconSize  = 50;

        // Render for special events
        this.newRound   = false;
        this.gameOver   = false;
        this.renderTime = tickRate * 100;
        this.currentRenderTime = 0;
    }

    // Draw Progress Bar
    drawHealthBar(x, y, health){
        ctx.fillRect(x, y, this.progressBarWidth, this.progressBarHeight); // Background
        ctx.fillStyle = this.healthBarColor; // Change to health bar color
        ctx.fillRect(x, y, health*2, this.progressBarHeight); // Health Overlay
        ctx.fillStyle = this.fillColor;      // Revert to normal fill color
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
        
        ctx.fillStyle  = this.color;    // Temporarily change fill color

        // Score
        var playersScore = players[0].score + " | " + players[1].score;
        ctx.fillText(playersScore, virtualWidth/2, 50);

        // Player 1
        this.drawHealthBar(0, virtualHeight - 100, players[0].health);
        ctx.drawImage(bulletImage, 0, virtualHeight - 10 - this.iconSize, this.iconSize, this.iconSize);
        ctx.fillText(players[0].ammo + "/" + players[0].maxAmmo, this.iconSize,  virtualHeight - 10);
        ctx.drawImage(healthImage, 0, virtualHeight - 100, this.progressBarHeight, this.progressBarHeight);

        // Player 2
        this.drawHealthBar(virtualWidth-this.progressBarWidth, virtualHeight - 100, players[1].health);
        ctx.drawImage(bulletImage, virtualWidth-this.progressBarWidth, virtualHeight - 10 - this.iconSize, this.iconSize, this.iconSize);
        ctx.fillText(players[1].ammo + "/" + players[1].maxAmmo, virtualWidth-this.progressBarWidth+this.iconSize, virtualHeight - 10);
        ctx.drawImage(healthImage, virtualWidth-this.progressBarWidth, virtualHeight - 100, this.progressBarHeight, this.progressBarHeight);


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
        
        ctx.fillStyle = this.fillColor; // Revert normal fill color 
    }
}