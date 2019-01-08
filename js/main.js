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

// Game variables
var players;
var hud;
var tickRate;
var scoreIncrement;

/**
 * Init the game
 */
function init() {
    virtualWidth = $(canvas).width();
    virtualHeight = $(canvas).height();

    $(window).resize(function() {
        resizeCanvas();
    })

    resizeCanvas();
    
    players = [];
    players.push(new Player(100, 100, {right: 39, left: 37, up: 38, down: 40, fire: 13}));
    players.push(new Player(300, 100, {right: 68, left: 65, up: 87, down: 83, fire: 70}));


    // Get each players enemys
    for (let index = 0; index < players.length; index++) {
        players[index].enemys = players.slice();
        players[index].enemys.splice(index,1);
    }

    hud      = new Hud("white"); 
    tickRate = 1000/60;
    scoreIncrement = 10;
    
    setInterval(update, tickRate);
}

function concludeRound(winner){
    winner.score += scoreIncrement;
    // TODO: Reset players (new round)
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
    for (let index = 0; index < players.length; index++) {
        players[index].keyUp(e.keyCode);
    }
}

/**
 * Updates all the game objects. Calls the draw method after updating.
 */
function update() {
    alive = 0;
    for (let index = 0; index < players.length; index++) {
        players[index].update();
        if(players[index].health <= 0){
            players[index].die();
        }
        else{
            alive++;
        }
    }

    if(alive <= 1){ // Is there only one person left?
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
    ctx.drawImage(backgroundImage, 0, 0, virtualWidth, virtualHeight);
    for (let index = 0; index < players.length; index++) {
        players[index].draw(ctx);
    }
    hud.draw(ctx)
}

init(); // Setup the game