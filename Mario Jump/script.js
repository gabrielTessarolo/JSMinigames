const gameboard = document.querySelector(".game-board");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const title = document.querySelector(".titulo");
const play =  document.querySelector(".play");
const score = document.querySelector(".score");

var points = 0; startedCounting = false; gameOver = false;

function calcPipeVelocity(){
    var vm=1120; // 1680/1.5
    var widthGameBoard = window.getComputedStyle(gameboard).width.replace('px', '');

    const time = (widthGameBoard/vm).toFixed(0);
    return time;
}

function start(){
    calcPipeVelocity();
    pipe.style.animation = 'pipeMove'+` ${calcPipeVelocity()}s `+'infinite linear';
    title.remove();
    play.remove();
    startedCounting = true;
}

const jump = () => {
    if(!gameOver){
        mario.classList.add('jump');
        setTimeout(function(){mario.classList.remove('jump');}, 500);
    }
}

document.addEventListener("keydown", jump);
if(!startedCounting) document.addEventListener("keydown", start);

const loop = setInterval(function(){
    const pipeDistance = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipeDistance <= 175 && marioPosition <= 100 && pipeDistance > 30){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipeDistance}px`;
        console.log(pipe.offsetLeft);
        
        gameOver = true;
        mario.src = "game-over.png";
        mario.style.width = "120px";
        mario.style.left = "60px";
    }else{
        if(startedCounting){
            points += calcPipeVelocity()**(-1);
            score.textContent = "Score: "+points.toFixed(0);
        }
    }
}, 10);