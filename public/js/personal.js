angular.module('MarvelApp').directive('onLastRepeat', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast', element, attrs);
        }, 2000);
    };
}).directive('onLastRepeat2', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast2', element, attrs);
        }, 2000);
    };
})
.directive('onLastRepeat3', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast3', element, attrs);
        }, 2000);
    };
}).controller('PersonalController', ['$scope', '$http','$location','$rootScope', '$route','$timeout', function ($scope, $http, $location, $rootScope,$route,$timeout) {
  
   $(document).ready(function () {
        $("#overlay-for-contacts").hide();
        $("#overlay-for-contacts2").hide();
        $("#overlay-for-contacts3").hide();

    });

     $(".closebutton").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts").fadeOut("slow");
    });

    $(".closebutton2").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts2").fadeOut("slow");
    });

     $(".closebutton3").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts3").fadeOut("slow");
    });

     $(".imagebutton").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts").fadeIn("slow");
    });
     
   

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
             $scope.name = $rootScope.currentUser.fname;
             $scope.lname = $rootScope.currentUser.lname;
             $scope.id = $rootScope.currentUser._id;
              $scope.loggedin=true;

             $http.get("/favchars/" + $scope.id).success(function (response) {

        var arrays = [], size = 4;
        console.log(response);
          if(response==null ||  response=="")
             { 
                  $scope.loaded=true;
                  
             }
        if (response != null) {

            $scope.character = response;



        }

        else {


        }
    });

       $http.get("/getImage/" + $scope.id).
       success(function(response)
       {
             if(response=='0')
               {
                  $scope.image='../images/unknown.png';
                  $scope.about='Hi Everyone! I am awesome and so are each one of you guys because you are on this site';
                                
               }
               else
               {
                  $scope.image=response.image;
                 $scope.about=response.des;
               }

       });

       $http.get("/getAll").
       success(function(response)
       {
             if(response=='0')
               {
                      
               }
               else
               {
                 $scope.people=response;
               }

       });


        $scope.followinglist=[];
     
           $http.get("/getfollowing/" + $scope.id)
        .success(function (response) {
           
            if(response=='0')
           {
                
              $scope.notfollowing=false; 
                                   
           }
        else
          {
             console.log(response);
             $scope.notfollowing=true;
             for(i=0;i<response.length;i++)
               {
                   $http.get("/getInfo/" + response[i].followingid).
                   success(function(response2)
                   {
                      if(response2=='0')
                      {
                         
                              
                      }
                    else
                    {
                      console.log(response2);
                      var person={id:response2._id,first:response2.fname,last:response2.lname};
                      $scope.followinglist.push(person);
                      
                    }
  
           });

               }
          }
    });


        $scope.followerslist=[];
        $http.get("/getfollowers/" + $scope.id)
        .success(function (response) {
         if(response=='0')
           {
                
              $scope.nofollowers=false; 
                                   
           }
        else
          {
             console.log(response);
             $scope.nofollowers=true;
             for(i=0;i<response.length;i++)
               {
                   $http.get("/getInfo/" + response[i].userid).
                   success(function(response2)
                   {
                      if(response2=='0')
                      {
                         
                              
                      }
                    else
                    {
                      console.log(response2);
                      var person={id:response2._id,first:response2.fname,last:response2.lname};
                      $scope.followerslist.push(person);
                      
                    }
  
           });

               }
          }

      });


        $http.get("/getComicsReviewed/" + $scope.id)
        .success(function (response) {
            $scope.reviewed = response;
            if($scope.reviewed==null ||  $scope.reviewed=="")
             { 
                  $scope.loaded2=true;
                    
             }
            console.log($scope.reviewed);
        });

        $http.get("/getPurchases/" + $scope.id)
        .success(function (response) {
            $scope.purchased = response;
            if($scope.purchased==null ||  $scope.purchased=="")
             { 
                  $scope.loaded3=true;
                    
             }
            console.log($scope.purchased);
        });

        }
        else {
            $location.url('/login');
        }
    });


    

     



     

   

      

     $scope.$on('onRepeatLast', function (scope, element, attrs) {
        console.log('Executing');
          $timeout(function () { $scope.loaded = true; }, 3000);
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
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                autoHeight: true,
                transitionStyle: "fade"
            });
        },2000);

        });

         $scope.$on('onRepeatLast2', function (scope, element, attrs) {
        console.log('Executing');
           $timeout(function () { $scope.loaded2 = true; }, 3000);
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
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                autoHeight: true,
                transitionStyle: "fade"
            });
        }, 2000);

        });


          $scope.$on('onRepeatLast3', function (scope, element, attrs) {
        console.log('Executing');
           $timeout(function () { $scope.loaded3 = true; }, 3000);
        setTimeout(function () {
            $("#owl-demo4").owlCarousel({
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
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                autoHeight: true,
                transitionStyle: "fade"
            });
        }, 2000);

        });
   

  
  $(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            
        }
    });
});

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
    $scope.imageDetails=e.target.result;
};
    


    $scope.selectCharacter = function (id) {

        $scope.favcharid = id;
    }

    $scope.saveImage = function()
    {
      
         var about = {userid:$scope.id,firstname:$scope.name,lastname:$scope.lname,image:$scope.imageDetails,des:$scope.about};
         $http.post("/saveimage/" + $scope.id,about)
        .success(function (response) {
       

       console.log(response);

   });
   }
    
    $scope.selectComic = function (id) {

        $location.url("/comic/" + id);
    }

    $scope.showfollowers = function(){

   
   $("#overlay-for-contacts2").fadeIn("slow");
      
    }

    $scope.showfollowing = function(){

   
   $("#overlay-for-contacts3").fadeIn("slow");
      
    }

    $scope.deleteFavorite = function () {

         $http.delete("/removeFavorite/"+ $scope.id + "/id/" + $scope.favcharid)
    .success(function (response) {

          $route.reload();
    });


    }

    $scope.viewCharacter = function () {

        $location.url("/portfolio/" + $scope.favcharid);
    }

    $scope.logout = function () {

        $http.post("/logout")
    .success(function (response) {
        $location.url("/dashboard");

    });


    }
} ]);
