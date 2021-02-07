let images = document.getElementsByTagName("img");
images[0].addEventListener("click", function() {
    localStorage.setItem("dragon","assets/img/0-dragon");
    localStorage.setItem("dragonFrames","5");
});
images[1].addEventListener("click", function() {
    localStorage.setItem("dragon","assets/img/1-dragon");
    localStorage.setItem("dragonFrames","11");
});
images[2].addEventListener("click", function() {
    localStorage.setItem("dragon","assets/img/2-dragon");
    localStorage.setItem("dragonFrames","4");
});