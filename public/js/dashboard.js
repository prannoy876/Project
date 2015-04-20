angular.module('MarvelApp').controller('DashboardController', ['$scope', '$http', '$location', '$rootScope', '$route', function ($scope, $http, $location, $rootScope, $route) {

    $(document).ready(function () {
        $("#overlay-for-contacts").hide();

    });


    $scope.loggedin = null;
    $http.get('/loggedin').success(function (user) {

        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            $scope.name = $rootScope.currentUser.fname;
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

    $scope.showTrailer = function () {

        $("#overlay-for-contacts").fadeIn("slow");
        $(window).scrollTop($("#overlay-for-contacts").offset().top);

    }


    $scope.logout = function () {

        $http.post("/logout")
    .success(function (response) {
        $route.reload();

    });


    }
} ]);
