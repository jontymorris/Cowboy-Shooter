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

        this.buttons = [
            {
              name: 'resume',
              background: 'gray',
              font: 'black',
              callback: function(){
                //this.isPaused = false;
              }
            },
            {
              name: 'quit',
              background: 'gray',
              font: 'black',
              callback: function(){
                console.log('exit');
              }
            }
        ];

        // Create Menu Buttons
        this.mm = new MenuManager();
        for (let i = 0; i < this.buttons.length; i++) {
            this.mm.buttons.push(new Button(
                this.buttons[i].name,
                this.buttons[i].background,
                this.buttons[i].font,
                this.buttons[i].callback    
            ));
        }
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

        // Paused Menu
        if(this.isPaused){
            this.mm.draw(ctx);
        }

        // Score
        var playersScore = players[0].score + " | " + players[1].score;
        ctx.fillText(playersScore, virtualWidth/2-ctx.measureText(playersScore).width/2, 50);

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
        
        ctx.fillStyle = this.color; // Revert normal fill color 
    }
}