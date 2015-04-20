angular.module('MarvelApp').controller('MovieUpdateController', ['$scope', '$http', function ($scope, $http) {

    $http.get("/movie")
    .success(function (response) {

        $scope.movies = response;
        $scope.movieResult = response;
        $scope.movieCategory = response[0];
    });

    $scope.searchMovie = function () {
        console.log($scope.movieCategory.genre);
        console.log($scope.movie);
        if ($scope.movie == undefined) {
            $http.post("/findMovie/" + $scope.movieCategory.genre)
        .success(function (response) {

            $scope.movieResult = response;

        });
        }
        else {

            $http.post("/findMovie/" + $scope.movieCategory.genre + "/name/" + $scope.movie)
        .success(function (response) {

            $scope.movieResult = response;

        });


        }

    }

    $scope.update = function (movie) {
        if (movie == undefined) {

        }
        else {

            $scope.selected = movie;
        }

    }


    $scope.save = function (movie) {

        if (movie == undefined) {


        }
        else {

            $http.put("/updatemovie", movie)
        .success(function (response) {

            $scope.movies = response;

        });

        }


    }



} ]);
