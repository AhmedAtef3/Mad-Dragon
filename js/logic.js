//Select canvas and context
const cvs = document.getElementById("game-canvas");
const ctx = cvs.getContext("2d");

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
//to determine the difficulty
pipesGap = 150;
pipesSpeed = 1;
distanceBetweenPipes = 250
let planetGravity = 1.25;
let dragonImg = new Image();
let drakeFPS = parseInt(localStorage.dragonFrames);
let drakeSrc = localStorage.dragon;
console.log(drakeFPS);

//dragon object
const drake = {
    x: 0,
    y: 200,
    w: 90,
    h: 90,
    index: 0,
    radius: 12,
    draw: function () {
        dragonImg.src = `${drakeSrc}/${this.index}.png`;
        ctx.drawImage(dragonImg, this.x, this.y, this.w, this.h);
    },
    update:function(){
        if(frames%10==0){
        if(this.index<drakeFPS){
            this.index++;
        }else{
            this.index=0;
        }
    }
        this.gravity();
  
    },
    gravity:function(){
        if(this.y)
        this.y+=planetGravity;

    },  
    moveUp:function(){
        if(this.y-50>0){
           this.y-=50;
        }
    }

}

//background object
const bg = {
    x: 0,
    y: 0,
    w: 450,
    h: 600,

    draw: function () {
        ctx.drawImage(bgImage, this.x, this.y, this.w, this.h);
    }
};

//first foreground object under pipes
const fg1 = {
    x: 0,
    y: 262,
    w: 900,
    h: 209,
    dx: 2,

    draw: function () {
        ctx.drawImage(fg1Image, this.x, this.y, this.w, this.h);
    },

    update: function () {
        this.x = (this.x - this.dx) % (this.w / 2);
    }

};

//second foreground object above pipes
const fg2 = {
    x: 0,
    y: 459,
    w: 900,
    h: 141,
    dx: 2,

    draw: function () {
        ctx.drawImage(fg2Image, this.x, this.y, this.w, this.h);
    },

    update: function () {
        this.x = (this.x - this.dx) % (this.w / 2);
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
                // y: Math.floor((Math.random() * this.maxYPos) + 1)
                y: this.maxYPos * (Math.random() + 1)
            })
        }

        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            //Move pipes to the left
            p.x -= this.dx;
            let bottomPipeYPos = p.y + this.h + this.gap;

            //Collision Detection
            //Top pipe
            if(drake.x + drake.radius > p.x && drake.x - drake.radius < p.x + this.w &&
                drake.y + drake.radius > p.y &&  drake.y - drake.radius < p.y + this.h)
            {
                  //GAME OVER
                  alert("Game Over");

            }
            //Bottom pipe
            if(drake.x + drake.radius > p.x && drake.x - drake.radius < p.x + this.w &&
                drake.y + drake.radius > bottomPipeYPos &&  drake.y - drake.radius < bottomPipeYPos + this.h)
            {
                  //GAME OVER
                  alert("Game Over");

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
        ctx.font = "35px Teko";
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
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();
cvs.addEventListener("click", () => {
    drake.moveUp();
});