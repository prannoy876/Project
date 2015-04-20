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
                items: 3
            }
        },
        navigation: true,
        animateOut: 'fadeOut',
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        autoHeight: true,
        transitionStyle: "fade"
    });
},1000);


setTimeout(function () {
    $("#owl-demo3").owlCarousel({
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
                items: 3
            }
        },
        navigation: true,
        animateOut: 'fadeOut',
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        autoHeight: true,
        transitionStyle: "fade"
    });
},1000);