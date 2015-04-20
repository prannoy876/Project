angular.module('MarvelApp').controller('CartController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {

$scope.items=null;
    $scope.deleteItem=null;
    $scope.updateItemQuantity = null;
    $scope.updateItem = null;


     $(document).ready(function () {
   
        $("#overlay-for-contacts2").hide();
      

    });

    
     

    $(".closebutton2").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts2").fadeOut("slow");
    });

    
$http.get('/loggedin').success(function (user) {

                   $rootScope.errorMessage = null;
                   if (user !== '0') {
                      $scope.name = $rootScope.currentUser.fname;
                      $scope.id = $rootScope.currentUser._id;
                      $scope.loggedin = true;
                       $http.get("/cartitems/" + $scope.id)
                        .success(function (response) {

                            $scope.items = response;
                            if(response.length!==0)
                             {
                                $scope.empty=false;
                                console.log($scope.empty);
                             }
                             else
                             {
                                 $scope.empty=true;
                                console.log($scope.empty);
                             }
                            
                        });
                   }
                   else {
                       $location.url('/login');
                   }
                   });

    

   


    $scope.getComic = function (id) {

        $location.url("/comic/" + id);
    }

    $scope.setItemToDelete = function(id)
    {
        $scope.deleteItem = id;

    }

     $scope.editOrder = function(book)
    {
        $scope.updateItemQuantity = book.quantity;
        $scope.updateItem = book.comicid;
    }

     $scope.removeComic=function(){
      $http.delete("/removeComic/"+ $scope.id + "/id/" + $scope.deleteItem)
    .success(function (response) {

           $scope.items=response;
            if(response.length!==0)
                             {
                                $scope.empty=false;
                                console.log($scope.empty);
                             }
                             else
                             {
                                 $scope.empty=true;
                                console.log($scope.empty);
                             }
                            
          
    });
    }

    $scope.purchaseComics = function(){

    $http.post("/purchase/" + $scope.id).success(function(response)
    {
        if(response=='success')
          {
             $scope.items=null;
             $scope.empty=true;
             $("#overlay-for-contacts2").fadeIn("slow");
          }

    });

    }

   
     $scope.updateQuantity=function(value){
      $http.put("/updateQuantity/"+ $scope.id + "/id/" + $scope.updateItem + "/qty/" + value)
    .success(function (response) {

           $scope.items=response;
    });

    };


    $scope.logout = function () {

        $http.post("/logout")
    .success(function (response) {
        $location.url("/dashboard");

    });
    }

} ]);