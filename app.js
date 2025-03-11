let gameSequence = [];
let userSequence = [];
let highscore= localStorage.getItem('highscore')? parseInt(localStorage.getItem('highscore')):0;
let hs=document.querySelector("h3");;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let heading2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSequence=[];
    level++;
    heading2.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4); // Fix: Use 4 instead of 3 to include all colors
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSequence.push(randColor);
    console.log(gameSequence);
    btnflash(randBtn); // Fix: Pass the button element, not the color string
    
    //check if current level exceeds highscore
    if(level>highscore)
        {
            highscore=level;
            localStorage.setItem('highscore',highscore); //store new highscore in localstorage
        } 
}

function btnPress(){
    let btn= this;
    btnflash(btn);
    let userColor= btn.getAttribute("id");
    userSequence.push(userColor);
    checkAns(userSequence.length-1);
}

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function checkAns(index){
    if(userSequence[index]===gameSequence[index]){
        if(userSequence.length==gameSequence.length){
            setTimeout(levelUp,1000);
        }
    } else{
        heading2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to Restart.`;
        hs.innerHTML = `HighScore :${highscore}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="#Fffdd0";
        },150);
        reset();
    }
}

function reset(){
    started=false;
    gameSequence=[];
    gameSequence=[];
    level=0;
}