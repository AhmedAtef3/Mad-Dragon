window.onload=function(){
let images = document.getElementsByTagName("img");
images[1].addEventListener("click", function() {
    localStorage.setItem("difficulty","easy");
});
images[2].addEventListener("click", function() {
    localStorage.setItem("difficulty","medium");
});
images[3].addEventListener("click", function() {
    localStorage.setItem("difficulty","hard");
});
let bgMusic=new Audio();
bgMusic.src="assets/audio/background.mpeg";
bgMusic.play();
}