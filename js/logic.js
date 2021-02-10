//Select canvas and context
window.onload=function(){
const cvs = document.getElementById("game-canvas");
const ctx = cvs.getContext("2d");

cvs.height = window.innerHeight;
cvs.width = window.innerWidth;

//Creat game variables and constants
let frames = 0;
//Background images
const bgImage = new Image();
bgImage.src = "assets/img/0-bg.png";
const fg1Image = new Image();
fg1Image.src = "assets/img/0-fg.png";
const fg2Image = new Image();
fg2Image.src = "assets/img/1-fg.png";
//Pipe images
const northPipeImage = new Image();
northPipeImage.src = "assets/img/np.png";
const southPipeImage = new Image();
southPipeImage.src = "assets/img/sp.png";
let isGameOver = false;
const gameMusic=new Audio();
gameMusic.volume=.2;
gameMusic.src="assets/audio/game-music.mp3";
gameMusic.muted=true;
//Difficulty object
const difficulty = {
    easy: {
        pipesGap: cvs.width*.20,
        pipesSpeed: 1,
        distanceBetweenPipes: 350,
        planetGravity: 1.25,
        flappingSpeed: 10,
        jumpHeight: 50
    },
    medium: {
        pipesGap: cvs.width*.15,
        pipesSpeed: 3,
        distanceBetweenPipes: 100,
        planetGravity: 1.25,
        flappingSpeed: 7,
        jumpHeight: 50
    },
    hard: {
        pipesGap: 150,
        pipesSpeed: 4,
        distanceBetweenPipes: 80,
        planetGravity: 3,
        flappingSpeed: 4,
        jumpHeight: 80
    },

    getDifficulty: function () {
        switch (localStorage.difficulty) {
            case "easy":
                return this.easy;
            case "medium":
                return this.medium;
            case "hard":
                return this.hard;
        }
    }
}

//Drake variables
let planetGravity = difficulty.getDifficulty().planetGravity;
let dragonImg = new Image();
let drakeFPS = parseInt(localStorage.dragonFrames);
let drakeSrc = localStorage.dragon;
let flappingSpeed = difficulty.getDifficulty().flappingSpeed;
let jumpHeight = difficulty.getDifficulty().jumpHeight;
//Difficulty Variables
let pipesGap = difficulty.getDifficulty().pipesGap;
let pipesSpeed = difficulty.getDifficulty().pipesSpeed;
let distanceBetweenPipes = difficulty.getDifficulty().distanceBetweenPipes;

//dragon object
const drake = {
    x: 0,
    y: cvs.height/2,
    w: cvs.width*.10,
    h: cvs.width*.10,
    index: 0,
    radius: cvs.width*.10,
    draw: function () {
        dragonImg.src = `${drakeSrc}/${this.index}.png`;
        ctx.drawImage(dragonImg, this.x, this.y, this.w, this.h);
    },
    update: function () {
        if (frames % flappingSpeed == 0) {
            if (this.index < drakeFPS) {
                this.index++;
            } else {
                this.index = 0;
            }
        }
        this.gravity();
    },
    gravity: function () {
      
            this.y += planetGravity;
            
       if(this.y+this.h>=(cvs.height-fg2.h)){
           isGameOver=true
          
       }
    },
    moveUp: function () {
        if (this.y - jumpHeight > 0) {
            this.y -= jumpHeight;
        }
    }

}

//background object
const bg = {
    x: 0,
    y: 0,
    w: cvs.width,
    h: cvs.height,

    draw: function () {
        ctx.drawImage(bgImage, this.x, this.y, this.w, this.h);
    }
};

//first foreground object under pipes
const fg1 = {
    x: 0,
    y: cvs.height-(cvs.height*0.4),
    w: cvs.width*2,
    h: cvs.height*0.25,
    dx: 2,

    draw: function () {
        ctx.drawImage(fg1Image, this.x, this.y, this.w, this.h);
    },

    update: function () {
        this.x = (this.x - this.dx) % (this.w/2);
    }

};

//second foreground object above pipes
const fg2 = {
    x: 0,
    y: cvs.height-(cvs.height*0.17),
    w: cvs.width*2,
    h: cvs.height*0.17,
    dx: 2,

    draw: function () {
        ctx.drawImage(fg2Image, this.x, this.y, this.w, this.h);
        ctx.drawImage(fg2Image, this.x+this.w, this.y, this.w, this.h);
    },

    update: function () {
        this.x = (this.x - this.dx) % (this.w/2);
    }

};

//Pipes object
const pipes = {
    position: [],
    maxYPos: -260,
    w: 75,
    h: 561,
    gap: pipesGap,
    dx: pipesSpeed,

    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let northY = p.y;
            let southY = northY + this.h + this.gap;
            //Draw north pipe
            ctx.drawImage(northPipeImage, p.x, northY, this.w, this.h);
            //Draw south pipe
            ctx.drawImage(southPipeImage, p.x, southY, this.w, this.h);
        }
    },

    update: function () {
        //Create new pipes with random y position
        if (frames % distanceBetweenPipes === 0) {
            this.position.push({
                x: cvs.width,
                 y: Math.floor(this.maxYPos * (Math.random() + 1))
                //y: this.maxYPos * (Math.random() + 1)
            })
        }

        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            //Move pipes to the left
            p.x -= this.dx;
            let bottomPipeYPos = p.y + this.h + this.gap;

          
            if (drake.x + drake.radius > p.x &&
                drake.x - drake.radius < p.x + this.w &&
                drake.y + drake.radius > p.y && drake.y+drake.radius/4 < p.y + this.h) {

             
                    isGameOver = true;


            }
            //Bottom pipe
            if (drake.x + drake.radius > p.x && 
                drake.x - drake.radius < p.x + this.w &&
                drake.y + drake.radius-drake.radius*.02  > bottomPipeYPos) {
             
                    isGameOver = true;


            }




            //Delete pipes that reached the end of canvas from array
            if (p.x + this.w <= 0) {
                this.position.shift();
                //Increment Score
                score.value += 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    }
}

//South pipe object



//Score
const score = {

    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,

    draw: function () {

        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.font = "35px arial";
        ctx.fillText(this.value, cvs.width / 2, 50);
        ctx.strokeText(this.value, cvs.width / 2, 50);

    }

}

//Draw all canvas elements
function draw() {
    bg.draw();
    fg1.draw();
    drake.draw();
    pipes.draw();
    fg2.draw();
    score.draw();
}

function update() {
    fg1.update();
    fg2.update();
    drake.update();
    pipes.update();
}

function loop() {
    if (!isGameOver) {
        update();
        draw();
        frames++;
        requestAnimationFrame(loop);
      
    }else{
      gameMusic.pause();  
    }
}
loop();
cvs.addEventListener("click", () => {
    drake.moveUp();
});

cvs.addEventListener("keypress", (e) => {
  if(e.keyCode===32||e.keyCode===119){
      drake.moveUp();
  }else{
    console.log(e.keyCode);
  }
})
gameMusic.muted=false;
gameMusic.play();
}