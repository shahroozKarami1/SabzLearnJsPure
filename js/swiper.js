const swiper = new Swiper(".swiper", {
    speed: 200,
    loop: true,
    
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        },
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },


})