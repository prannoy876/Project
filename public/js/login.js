angular.module('MarvelApp').controller('LoginController', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {


    $("#overlay-for-contacts").hide();
    $(".newbutton").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts").fadeIn("slow");
    });

    $(".closebutton").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts").fadeOut("slow");
    });
    $scope.invalid = false;
    $scope.login = function (user) {
        $http.post("/login", user)
    .success(function (response) {
        console.log(response);
        if (response == null) {
            console.log("Response is null");
            $scope.invalid = true;
        }
        else {
            $rootScope.currentUser = response;
            $location.url("/dashboard");
        }
    })
    .error(function (response) {

        $scope.invalid = true;
    });
    }

} ]);
