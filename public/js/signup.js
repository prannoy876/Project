angular.module('MarvelApp').controller('SignUpController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.insert = function (user) {
        $http.post("/signup", user)
    .success(function (response) {

        if (response == 'success') {

            $location.url('/login');
        }


    });
    };

    $scope.login = function () {

        $location.url('/login');
    }

} ]);