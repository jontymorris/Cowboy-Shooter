// Canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var canvasWidth;
var canvasHeight;
var virtualWidth;
var virtualHeight;

// Assets
var backgroundImage = document.getElementById("backgroundImage");
var leftImage = document.getElementById("leftImage");
var rightImage = document.getElementById("rightImage");
var downImage = document.getElementById("downImage");
var upImage = document.getElementById("upImage");

// Game variables
var player1;
var player2;

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
    
    player1 = new Player(100, 100, {right: 39, left: 37, up: 38, down: 40, fire: 13});
    player2 = new Player(300, 100, {right: 68, left: 65, up: 87, down: 83, fire: 70});

    setInterval(update, 1000/60);
}

/**
 * Resizes the game canvas so it adapts to the window
 */
function resizeCanvas() {
    $(canvas).width($(window).width() * 0.8);
    canvasWidth = $(canvas).width();
    canvasHeight = $(canvas).height();
}

// Key down events
window.onkeydown = function(e) {
    player1.keyDown(e.keyCode);
    player2.keyDown(e.keyCode);
}

// Key up events
window.onkeyup = function(e) {
    player1.keyUp(e.keyCode);
    player2.keyUp(e.keyCode);
}

/**
 * Updates all the game objects. Calls the draw method after updating.
 */
function update() {
    player1.update();
    player2.update();

    draw();
}

/**
 * Draw all the game objects
 */
function draw() {
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    player1.draw(ctx);
    player2.draw(ctx);
}

init(); // Setup the game