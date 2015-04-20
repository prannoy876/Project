$('.carousel').carousel({
    interval: 3000
});

setTimeout(function () {
    $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        stopOnHover: true,
         responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    },
        navigation: true,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        autoHeight: true,
        transitionStyle: "fade"
    });
}, 12000);


setTimeout(function () {
    $("#owl-demo2").owlCarousel({
        autoPlay: 3000,
        stopOnHover: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        },
        navigation: true,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        autoHeight: true,
        transitionStyle: "fade"
    });
}, 3000);


 