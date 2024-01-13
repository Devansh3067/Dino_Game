let dino = document.querySelector(".dino");
let dragon = document.querySelector(".dragon");
let flying_dragon = document.querySelector(".flying_dragon");
let score_count = document.querySelector(".score");
let high_score_count = document.querySelector(".high");
let game_over = document.querySelector(".game_over");
let restart_button = document.querySelector(".restart");

let bgMusic = new Audio("a_bgm.mp3");
bgMusic.play();
bgMusic.loop = true;

let jump_music = new Audio("a_Jump Sound.mp3");

let death_music = new Audio("a_death_music.mp3");

let dragonX;
let dinoX;
let dragonY;
let dinoY;
let fDragonX;
let fDragonY;

let score = 0;
let highScore = 0;

let score_up = true;

let dragon_speed;

document.addEventListener("keydown",(event)=>{
    // console.log(event.keyCode);
    if((event.keyCode == 38 || event.keyCode == 32) && !(dino.classList.contains('dino_down'))){
        dino.classList.add("dino_jump");
        dino_jump = true;
        jump_music.play();
        setTimeout(()=>{
            dino.classList.remove("dino_jump");
        },900)
    }
    else if(event.keyCode == 39 && parseInt(window.getComputedStyle(dino, null).getPropertyValue("right"))>0){
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX + 112 + "px";
    }
    else if(event.keyCode == 37 && parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))>0){
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX - 110 + "px";
    }
})

setInterval(()=>{
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("left"));
    dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue("bottom"));
    dragonY = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("bottom"));
    fDragonX = parseInt(window.getComputedStyle(flying_dragon, null).getPropertyValue("left"));
    fDragonY = parseInt(window.getComputedStyle(flying_dragon, null).getPropertyValue("bottom"));
    // console.log("Dragon:", dragonX);
    // console.log("Dragon:", dragony);
    // console.log("Dino:", dinoX);
    // console.log("Dino:", dinoY);
    dino_dragon_X = Math.abs(dragonX - dinoX);
    dino_dragon_Y = Math.abs(dragonY - dinoY);
    dino_fdragon_X = Math.abs(fDragonX - dinoX);
    dino_fdragon_Y = Math.abs(fDragonY - dinoY);


    if((dino_dragon_X < 120 && dino_dragon_Y < 100 && dinoX<dragonX) || (dino_fdragon_Y < 120 && dino_fdragon_X < 120)){
        death_music.play();
        setTimeout(()=>{
            death_music.pause();
            death_music.currentTime = 0;
        },2000);
        dragon.style.left = dragonX + "px";
        flying_dragon.style.left = fDragonX + "px";
        game_over.style.visibility = "visible";
        restart_button.style.visibility = "visible";
        dino.classList.add("dino_down");
        dragon.classList.remove("animate_dragon");
        flying_dragon.classList.remove("animate_flying_dragon");
        dino.style.bottom = dinoY - 200+ "px";
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
    else if(dino_dragon_X < 120 && score_up && !(dino.classList.contains('dino_down'))){
       score+=1;
       if(score >= 25){
            flying_dragon.classList.add("animate_flying_dragon");
       }
       updateScore(score);
       if(score > highScore){
            highScore = score;
            updateHighScore(highScore);
        }
       score_up = false;
       setTimeout(()=>{
            score_up = true;
        },1000)
    }
    dragon_speed = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue("animation-duration"));
    new_Dur = dragon_speed - 5;
    dragon.style.animationDuration = new_Dur + 's';
},10);

function updateScore(score){
    score_count.innerHTML = "Your score: " + score;
}
function updateHighScore(score){
    high_score_count.innerHTML = "HighestScore: " + score;
}

restart_button.addEventListener("click",()=>{
    // console.log("clicked");
    score = 0;
    updateScore(score);
    dino.style.bottom = 0 + "px";
    dino.style.left = 60 + "px";
    dragon.classList.add("animate_dragon");
    flying_dragon.style.left = 1500 +"px";
    
    dino.classList.remove("dino_down");
    game_over.style.visibility = "hidden";
    restart_button.style.visibility = "hidden";
    bgMusic.play();
    bgMusic.loop = true;
})