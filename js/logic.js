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
let planetGravity=1.25;
let dragonImg=new Image();
let drakeFPS = parseInt(localStorage.dragonFrames);
let drakeSrc = localStorage.dragon;
console.log(drakeFPS);

//dragon object
const drake = {
    x:0,
    y:200,
    w:90,
    h:90,
    index:0,
    draw: function() {
       
            dragonImg.src=`${drakeSrc}/${this.index}.png`;
           
        
        // dragonImg.src=`assets/img/0-dragon/${this.index}.png`;
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

    draw: function() {
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

    draw: function() {
        ctx.drawImage(fg1Image, this.x, this.y, this.w, this.h);
    },

    update: function() {
        this.x = (this.x-this.dx)%(this.w/2);
    }

};

//second foreground object above pipes
const fg2 = {
    x: 0,
    y: 459,
    w: 900,
    h: 141,
    dx: 2,

    draw: function() {
        ctx.drawImage(fg2Image, this.x, this.y, this.w, this.h);
    },

    update: function() {
        this.x = (this.x-this.dx)%(this.w/2);
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

    draw: function() {
        for(let i=0; i<this.position.length; i++) {
            let p = this.position[i];
            let northY = p.y;
            let southY = northY + this.h + this.gap;
            //Draw north pipe
            ctx.drawImage(northPipeImage, p.x, northY, this.w, this.h);
            //Draw south pipe
            ctx.drawImage(southPipeImage, p.x, southY, this.w, this.h);
        }
    },

    update: function() {
        //Create new pipes with random y position
        if(frames%distanceBetweenPipes === 0) {
            this.position.push({
                x: cvs.width,
                // y: Math.floor((Math.random() * this.maxYPos) + 1)
                y: this.maxYPos * (Math.random()+1)
            })
        }

        for(let i=0; i<this.position.length; i++) {
            let p = this.position[i];

            //Move pipes to the left
            p.x -= this.dx;

            //Delete pipes that reached the end of canvas from array
            if(p.x+this.w <= 0) {
                this.position.shift();
            }
        }
    }
}

//South pipe object

//Draw all canvas elements
function draw() {
    bg.draw();
    fg1.draw();
    drake.draw();
    pipes.draw();
    fg2.draw();
}

function update() {
    fg1.update();
    fg2.update();
    drake.update();
    pipes.update();
}

function loop () {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();
cvs.addEventListener("click",()=>{
    drake.moveUp();
});