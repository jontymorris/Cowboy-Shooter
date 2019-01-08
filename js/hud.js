class Hud {

    constructor(color){
        // Font Settings
        ctx.font    = "30px Arial";
        this.color  = color;
    }

    draw(ctx) {
        
        var fillColor = ctx.fillColor; // Current fill color
        ctx.fillStyle = this.color;

        var playersScore = players[0].score + " | " + players[1].score;
        var textHeight   = 10 
        var textWidth    = ctx.measureText("AMMO:1234").width + 10;

        // Score
        ctx.fillText(playersScore, virtualWidth/2, 50);

        // Player 1
        ctx.fillText("Health: " + players[0].health, 0, virtualHeight-textHeight - 50);
        ctx.fillText("Ammo: " + players[0].ammo, 0, virtualHeight-textHeight - 10);
        
        // Player 2
        ctx.fillText("Health: " + players[1].health, virtualWidth-textWidth, virtualHeight-textHeight  - 50);
        ctx.fillText("Ammo: " + players[1].ammo, virtualWidth-textWidth, virtualHeight-textHeight  - 10);
    
        ctx.fillStyle = fillColor; // Revert fill color 
    }
}