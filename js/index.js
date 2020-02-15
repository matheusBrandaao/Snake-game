var mainMenu = document.getElementById('main-menu');
var stage = document.getElementById('stage');
var pontuacao = document.getElementById('pontuacao');
var start = document.getElementById('start-button');
var restart = document.getElementById('restart');
var fimjogo = document.getElementById('game-over');
var finalScore = document.getElementsByClassName('final-score');


// const foodImg = new Image();
// foodImg.src = "./assets/food.png";

var ctx = stage.getContext("2d");

var pontos = 0;
var finalPoints = 0;

const vel = 1; //consumir um ponto por vez

var velX = velY = 0; // velocidade inicial
var px = py = 15; //ponto de inicio da cobra
var tp = 20; // tamanho do ponto
var qp = 30; // quantidade de quadrados do tabuleiro linha
var ax = ay = Math.floor(Math.random()*qp); // posicao inicial da comida

// var food = {
//     x: ax,
//     y: ay
// }

let mainAudio = new Audio();
mainAudio.src = "./audio/main-menu.mp3";

let gameOverSong = new Audio();
gameOverSong.src = "./audio/game-over.mp3"

// let eat = new Audio();
// eat.src = "./eat.mp3";

mainAudio.volume = 0.1;
gameOverSong.volume = 0.1;

//Tamanho inicial de 3 posições
var trail = []; //Rastro
trail[0] = {x : px, y: py};
trail[1] = {x : px*2, y: py*2};
trail[2] = {x : px*3, y: py*3};
var tail = 3;

var id; //clearInterval

function game(){
    px += velX;
    py += velY;
        if (px <0) 
        {
            px = qp-1;
        }
        if (px > qp-1) 
        {
            px = 0;
        }
        if (py < 0) 
        {
            py = qp-1;
        }
        if (py > qp-1) 
        {
            py = 0;
        }
    pintaCenario();
    addRastro();
    verifColisao();
 }

function pintaCenario(){
    ctx.fillStyle = "black"; //stage
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "red"; //comida
    // ctx.drawImage(foodImg, ax, ay);
    ctx.fillRect(ax*tp, ay*tp, tp,tp);
            
 
    ctx.fillStyle = "gray"; //cobra
}

function addRastro(){
    ctx.fillRect(trail[0].x*tp, trail[0].y*tp, tp-1, tp-1);
    ctx.fillRect(trail[1].x*tp, trail[1].y*tp, tp-1, tp-1);
    ctx.fillRect(trail[2].x*tp, trail[2].y*tp, tp-1, tp-1);
    for (var i = 3; i < trail.length; i++) {
        ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            if (trail[0].x == trail[i].x && trail[0].y == trail[i].y)
            {
            gameOver();
            }
        }
        trail.push({x:px,
                    y:py})
        while (trail.length > tail){
            trail.shift();
        }
}

function gameOver(){
    finalScore.innerHTML = "Final Score: " + finalPoints;
    mainAudio.pause();
    gameOverSong.load();
    gameOverSong.play();
    clearInterval(id);
    velX = velY = 0;
    tail = 3;
    pontos = 0;
    px = py = 15;
    ax = Math.floor(Math.random()*qp);
    ay = Math.floor(Math.random()*qp);
    pontuacao.innerHTML = "Score: " + pontos;
    stage.style.display = "none";
    pontuacao.style.display = "none";
    mainMenu.style.display = "none";
    fimjogo.style.display = "block";
}

function verifColisao(){
    if (ax == px && ay == py){
        // eat.play();
        tail++;
        pontos = pontos + 10;
        finalPoints = pontos;
        pontuacao.innerHTML = "Score: " + pontos;
        ax = Math.floor(Math.random()*qp);
        ay = Math.floor(Math.random()*qp);
    }
}

//Direções selecionadas
function keyPush(event){
        switch (event.keyCode) {
            case 37: // Left
                velX = -vel;
                velY = 0;
                break;
            case 38: // up
                velX = 0;
                velY = -vel;
                break;
            case 39: // right
                velX = vel;
                velY = 0;
                break;
            case 40: // down
                velX = 0;
                velY = vel;
                break;         
                default:                
                break;
    }
}

function mainGame(){
    mainAudio.load();
    mainAudio.play();
    mainMenu.style.display = "none";
    stage.style.display = "block";
    pontuacao.style.display = "block";
    document.addEventListener("keydown", keyPush);
    id = setInterval(game, 80);
}

start.addEventListener("click", mainGame);

restart.addEventListener("click", function(){
    gameOverSong.pause();
    mainAudio.load();
    mainAudio.play();
    clearInterval(id);
    fimjogo.style.display = "none";
    mainGame();
});

 

 