var nameLi = document.querySelector("#name");
var creatorLi = document.querySelector("#creator");
var diffLi = document.querySelector("#difficulty");
var imgLi = document.querySelector("#image");
var img = document.querySelector("#icon");

var gameHref = document.querySelector("#startHref"); 

var arrow = document.querySelector("#arrow");
var canClick = true;
var page = 1;

var lis = [nameLi, creatorLi, diffLi, imgLi];
// ^ Lista com as li's. 

var marioJump = {
    name: "Mario Jump",
    creator: "Binichim",
    difficulty: "2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    img: "./Mario Jump/icons8-super-mario-100.png",
    site: "./Mario Jump/marioJump.html"
}

var hitTheClown = {
    name: "Hit The Clown",
    creator: "Binichim",
    difficulty: "2.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    img: "Hit The Clown/hitTheClownIcon.png",
    site: "./Hit The Clown/hitTheClown.html"
}

var games = [
    marioJump,
    hitTheClown
]

function giveAnimation(){
    canClick = false;
    for(var i = 0; i < lis.length; i++){
        var actualLi = lis[i];
        if(i == 3) {
            actualLi.classList.add("enterImg");
            break
        }
        actualLi.classList.add("enterDesc");   
    }
    setTimeout(function(){
        for(var i = 0; i < lis.length; i++){
            var actualLi = lis[i];
            if(i == 3) {
                actualLi.classList.remove("enterImg");
            }else{
                actualLi.classList.remove("enterDesc");   
            }
        }
       
    }, 1750);
    
}

giveAnimation();

function nextPage(){
    page++;
    if(page > games.length) page = 1;
    var nextGame = games[page-1];
    nameLi.innerHTML = nextGame.name;
    creatorLi.innerHTML = nextGame.creator;
    diffLi.innerHTML =  nextGame.difficulty;
    var star = document.createElement("img");
    star.src = "./star.png";
    star.id = "star";
    diffLi.appendChild(star);

    img.src = nextGame.img;

    gameHref.href = nextGame.site;

    giveAnimation();


   
}

if(nameLi.classList.contains("enterDesc")) canClick = true;

if(canClick) arrow.addEventListener("click", nextPage);

