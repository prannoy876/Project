angular.module('MarvelApp').controller('MarvelController', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {

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




    $http.jsonp("http://gateway.marvel.com/v1/public/characters?apikey=7c2ea1955f73606dbc9443ac7507c3bf&&callback=JSON_CALLBACK&&limit=100")
.success(function (response) {

    var arrays = [], size = 4;

    while (response.data.results.length > 0)
        arrays.push(response.data.results.splice(0, size));

    console.log(arrays);

    $scope.character = arrays;
})

    $scope.addFavourite = function (character) {
        var charData = { userid: $scope.id.toString(), charid: character.id.toString(), name: character.name, image: encodeURI(character.thumbnail.path + '.' + character.thumbnail.extension) };
        $http.post("/addFavoriteChars/" + $scope.id + "/name/" + character.id, charData)
    .success(function (response) {
        $("#overlay-for-contacts").fadeIn("slow");
        $(window).scrollTop($("#overlay-for-contacts").offset().top);

        $scope.favstatus = response;

    });
    }


    $scope.getCharacter = function () {


        var name = $scope.searchByCharName;
        $http.jsonp("http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=" + name + "&apikey=7c2ea1955f73606dbc9443ac7507c3bf&&callback=JSON_CALLBACK")
    .success(function (response) {

        var arrays = [], size = 4;

        while (response.data.results.length > 0)
            arrays.push(response.data.results.splice(0, size));

        console.log(arrays);

        $scope.character = arrays;
    });

    }


    $scope.logout = function () {
        $http.post("/logout")
    .success(function (response) {
        $location.url("/dashboard");

    });
    }

} ]);



    
    