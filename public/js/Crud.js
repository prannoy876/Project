var app = angular.module("CrudApp", []);


app.controller("CrudCtrl", function ($scope, $http) {
    $http.get("/flights")
    .success(function (response) {

        $scope.flights = response;
    });

    $scope.remove=function(index){
      $http.delete("/flights/"+ index)
    .success(function (response) {

        $scope.flights = response;
    });
    };

    $scope.selectedIndex=null;
    
     $scope.edit=function(index){
        $scope.selectedIndex=index;
        $scope.flight=$scope.flights[index];
    };

     $scope.save=function(flight){
        
         $http.put("/flight/" + $scope.selectedIndex,flight)
    .success(function (response) {

        $scope.flights = response;
    });
    };

     $scope.add=function(flight){
      $http.post("/flight",flight)
    .success(function (response) {

        $scope.flights = response;
    });
    };

});

