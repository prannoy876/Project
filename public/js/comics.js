angular.module('MarvelApp').controller('ComicsController', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {

    $(document).ready(function () {
        $("#overlay-for-contacts").hide();

    });

    $http.get('/loggedin').success(function (user) {

        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            $scope.name = $rootScope.currentUser.fname;
            $scope.id = $rootScope.currentUser._id;
            $scope.loggedin = true;
        }
        else {
            $scope.loggedin = false;
        }
    });

    $(".closebutton").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts").fadeOut("slow");
    });

    $scope.addToCart = function (book) {
        if ($scope.loggedin) {
            var bookData = { userid: $scope.id, comicid: book.id.toString(), quantity: '1', title: book.title, price: book.prices[0].price.toString(), image: encodeURI(book.thumbnail.path + '.' + book.thumbnail.extension) };
            $http.post("/addToCart/" + $scope.id + "/name/" + book.id, bookData)
    .success(function (response) {

        if (response == 'success') {
            $("#overlay-for-contacts").fadeIn("slow");
            $(window).scrollTop($("#overlay-for-contacts").offset().top);

            $scope.comicstatus = 'Successfully added to your cart.';
        }
        else {
            $("#overlay-for-contacts").fadeIn("slow");
            $(window).scrollTop($("#overlay-for-contacts").offset().top);
            $scope.comicstatus = 'Book already exists in your cart.';
        }

    });
        }
        else {

            $location.url("/login");
        }


    }




    $http.jsonp("http://gateway.marvel.com/v1/public/comics?apikey=7c2ea1955f73606dbc9443ac7507c3bf&&callback=JSON_CALLBACK&&limit=100")
.success(function (response) {

    var arrays = [], size = 4;

    while (response.data.results.length > 0)
        arrays.push(response.data.results.splice(0, size));

    console.log(arrays);

    $scope.comics = arrays;
})

   


    $scope.getCharacter = function () {


        var name = $scope.searchByBookName;
        $http.jsonp("http://gateway.marvel.com:80/v1/public/comics?titleStartsWith=" + name + "&apikey=7c2ea1955f73606dbc9443ac7507c3bf&&callback=JSON_CALLBACK")
    .success(function (response) {

        var arrays = [], size = 4;

        while (response.data.results.length > 0)
            arrays.push(response.data.results.splice(0, size));

        console.log(arrays);

        $scope.comics = arrays;
    });

    }


    $scope.logout = function () {
        $http.post("/logout")
    .success(function (response) {
        $location.url("/dashboard");

    });
    }

} ]);

