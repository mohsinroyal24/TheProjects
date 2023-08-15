
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", ()=> {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () =>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))


var typed = new Typed('#element', {
    strings: ['<i>Data Analyst</i>', '<i>Web Developer</i>', '<i>Content Writer</i>'],
    typeSpeed: 50,
});

var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleControls'), {
    interval: 2000 // Set the desired interval for sliding
});

