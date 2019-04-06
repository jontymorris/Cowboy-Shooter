// Canvas
var canvas = document.getElementById("gameCanvas");
var ctx    = canvas.getContext("2d");

var canvasWidth;
var canvasHeight;
var virtualWidth;
var virtualHeight;

// Assets
var backgroundImage = document.getElementById("backgroundImage");
var leftImage       = document.getElementById("leftImage");
var rightImage      = document.getElementById("rightImage");
var downImage       = document.getElementById("downImage");
var upImage         = document.getElementById("upImage");
var bloodImage      = document.getElementById("bloodImage");
var bulletImage     = document.getElementById("bulletImage");
var healthImage     = document.getElementById("healthImage");

// Game variables
var players;
var hud;
var tickRate;
var scoreIncrement;
var rounds;
var roundAmountForGameOver;

/**
 * Init the game
 */
function init() {
    // Width/Height Settings
    virtualWidth = $(canvas).width();
    virtualHeight = $(canvas).height();

    $(window).resize(function() {
        resizeCanvas();
    })
    resizeCanvas();
    
    // Game Variables
    tickRate = 1000/60;
    scoreIncrement = 1;
    rounds = 0;
    roundAmountForGameOver = 5;

    // Establish Players
    players = [];
    players.push(new Player(randomCoordinates(), {right: 39, left: 37, up: 38, down: 40, fire: 13}));
    players.push(new Player(randomCoordinates(), {right: 68, left: 65, up: 87, down: 83, fire: 70}));

    // Give each player their enemies
    for (let index = 0; index < players.length; index++) {
        players[index].enemys = players.slice();
        players[index].enemys.splice(index,1);
        players[index].name = "Player " + (index+1); // Give player's their name
    }

    // Init HUD
    hud = new Hud("white"); 

    // Start Game loop
    setInterval(update, tickRate);
}

/**
* Get all winners at point in time
 */
function getWinners(){
    winners = [players[0]]; // List incase of a tied game (2+ winners)

    // Calculate winners
    for (let index = 1; index < players.length; index++) {
        // Player has higher score, replace all winners
        if(players[index].score > winners[0].score){
            winners = [players[index]];
        }
        // Player has same score, append to list (tie)
        else if(players[index].score == winners[0].score){
            winners.push(players[index]);
        }
    }
    return winners;
}

/**
* Calculate random X, Y values within screen
 */
function randomCoordinates(){
    return [Math.random() * ((virtualWidth-70) - 0), Math.random() * ((virtualHeight-112) - 0)];
}

/**
* Conclude and setup new round (or gameover trigger)
 */
function concludeRound(winner){
    rounds++;
    winner.score += scoreIncrement;
    for (let index = 0; index < players.length; index++) {
        players[index].reset();
    }
    if(rounds >= roundAmountForGameOver){hud.gameOver = true;}
    else{hud.newRound = true;}
}

/**
 * Resizes the game canvas so it adapts to the window
 */
function resizeCanvas() {
    $(canvas).width($(window).width());
    canvasWidth = $(canvas).width();
    canvasHeight = $(canvas).height();
}

// Key down events
window.onkeydown = function(e) {
    for (let index = 0; index < players.length; index++) {
        players[index].keyDown(e.keyCode);
    }
}

// Key up events
window.onkeyup = function(e) {
    // Toggle Menu 
    if (e.keyCode == 27){ hud.isPaused = !hud.isPaused}
    else{
        for (let index = 0; index < players.length; index++) {
            players[index].keyUp(e.keyCode);
        }
    }
}

/**
 * Updates all the game objects. Calls the draw method after updating.
 */
function update() {

    // Count how many players are alive
    alive = 0;
    for (let index = 0; index < players.length; index++) {
        players[index].update();
        if(players[index].health > 0){
            alive++;
        }
    }

    // Only 1 Person alive, conclude round
    if(alive <= 1){
        for (let index = 0; index < players.length; index++) {
            if(players[index].health > 0){
                concludeRound(players[index]);
                break;
            }
        }
    }
    draw();
}

/**
 * Draw all the game objects
 */
function draw() {

    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, virtualWidth, virtualHeight);

    // Draw HUD
    hud.draw(ctx);

    // Draw players
    for (let index = 0; index < players.length; index++) {
        players[index].draw(ctx);
    }
}

init(); // Setup the game