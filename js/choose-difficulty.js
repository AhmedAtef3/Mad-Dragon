let images = document.getElementsByTagName("img");
images[0].addEventListener("click", function() {
    localStorage.setItem("difficulty","easy");
})
images[1].addEventListener("click", function() {
    localStorage.setItem("difficulty","medium");
})
images[2].addEventListener("click", function() {
    localStorage.setItem("difficulty","hard");
})