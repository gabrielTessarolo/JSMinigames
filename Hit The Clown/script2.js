
var started = false;

const gameboard = document.querySelector('.game-board');
const clown = document.querySelector('.clown');
const ball = document.querySelector('.ball');

const score = document.querySelector('#score');

var started = false;

var throwed = false;
var hasHit = false;
var missed = false;

var counter = 0;
var stunCounter = 0;
 
var clownMoveTime = 2;

var points = 0;

clown.style.animation = 'clownMoves 2s infinite linear';
//Faz com que o palhaço passe a se mover
started = true;


const loop = setInterval(function() {
    score.innerHTML = `Score: ${points}`;
    
    if(missed){
        var clownLeftPosition = clown.offsetLeft;
        clown.style.animation = 'none';
        clown.style.left = `${clownLeftPosition}px`;
        
    }

    if(throwed) counter+=15; //A variável counter aumenta quando a bola foi jogada
    else counter = 0;

    if(counter >= 500){
        counter = 0;
        throwed = false;
        ball.classList.remove("throwingBall"); //O jogador só conseguirá atirar a bola depois de meio segundo (tempo da animação);
    } 

    hitClown(); //Função que verifica contantemente se o palhaço foi acertado. Se foi acertado, hasHit se torna true.

    if(hasHit){
        stunCounter+=15;
        if(stunCounter < 30){
            //As seguintes linhas de código só serão executadas na primeira ocorrência de hasHit (quando stunCounter só aumentou uma vez);
            clown.src = 'angryClown.png';
            points += 50;
            
        }
        var clownLeftPosition = clown.offsetLeft;
        clown.style.animation = 'none';
        clown.style.left = `${clownLeftPosition}px`;

    }
    if(stunCounter >= 2000){

        stunCounter = 0;
        hasHit = false;
        clown.src = 'palhaço.png';
        if(clownMoveTime > 0.4) clownMoveTime -= 0.2;
        clown.style.animation = `clownMoves ${clownMoveTime}s infinite linear`;
    }
    
    //O primeiro evento keydown inicia o jogo (o palhaço se move)

    if(started && !throwed) {
        document.addEventListener('keydown', throwBall);
    }
    //Os seguintes eventos keydown são para jogar a bola no palhaço.


    }
, 10)


function throwBall(){    
    if(!ball.classList.contains("throwingBall")){
        ball.classList.add("throwingBall");
        //Se a bola não tem a classe throwingBall, passará a ter
    } 

    throwed = true;
    //A bola é lançada e começa-se a contar o meio segundo de animação
}

function intersectRect(rec1, rec2){

    if(
        rec1.right < rec2.left || //Se a distância x da borda esquerda de um dos retângulos for maior que a
        rec2.right < rec1.left || //da borda direita do outro, eles não se interceptam.
        
        rec1.bottom < rec2.top || //Se a distância y da borda de cima de um dos retângulos for maior que a
        rec2.bottom < rec1.top    //da borda de baixo do outro, eles não se interceptam.
    )   return false; //retorna false se eles não se interceptam

    return true; //Se a verificação acima não for verdadeira, eles se interceptam.

}

function hitClown(){

    if(counter > 450){
        var clownMask = clown.getBoundingClientRect(); //Essa função cria um retângulo nas posições 
        var ballMask = ball.getBoundingClientRect();   //e com as dimensões do objeto em questão.

        if(intersectRect(clownMask, ballMask)){
            hasHit = true;
        }else{
            missed = true;
        }
    }
}


