
angular.module('MarvelApp').directive('onLastRepeat', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast', element, attrs);
        }, 1000);
    };
}).directive('onLastRepeat2', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast2', element, attrs);
        }, 2000);
    };
})
.controller('ViewController', ['$scope', '$http','$location','$rootScope', '$route','$timeout', '$routeParams',function ($scope, $http, $location, $rootScope,$route,$timeout,$routeParams) {
  

  $(document).ready(function () {
   
        $("#overlay-for-contacts2").hide();
        $("#overlay-for-contacts3").hide();

    });

    
     

    $(".closebutton2").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts2").fadeOut("slow");
    });

     $(".closebutton3").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts3").fadeOut("slow");
    });

      $scope.userid=$routeParams.id;

      getFollowers($scope.userid);
    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
             $scope.name = $rootScope.currentUser.fname;
             $scope.id = $rootScope.currentUser._id;
              $scope.loggedin=true;
              }
          else
          {

             $scope.loggedin=false;
          }  
          
           $http.get("/getInfo/" + $scope.userid).
                   success(function(response2)
                   {
                      if(response2=='0')
                      {
                         
                                
                      }
                    else
                    {
                       $scope.viewname=response2.fname;
                       $scope.fullname=response2.fname + " " + response2.lname;
                    }
  
           });

             $scope.followinglist=[];
     
           $http.get("/getfollowing/" + $scope.userid)
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

   

            $http.get("/getImage/" + $scope.userid).
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
          
           $http.get("/getComicsReviewed/" + $scope.userid)
        .success(function (response) {
            $scope.reviewed = response;
            if($scope.reviewed==null ||  $scope.reviewed=="")
             { 
                  $scope.loaded2=true;
                    
             }
            console.log($scope.reviewed);

           
        });

          $scope.showfollowers = function(){

   
   $("#overlay-for-contacts2").fadeIn("slow");
      
    }

    $scope.showfollowing = function(){

   
   $("#overlay-for-contacts3").fadeIn("slow");
      
    }

         $http.get("/checkfollower/" + $scope.id + "/following/" + $scope.userid)
         .success(function(response){

            if(response=='success')
               {
                 $scope.followerstatus="Unfollow";
               }
            else
               {
                 $scope.followerstatus = "Follow";
               }
         });

         $scope.followUser = function(userid)
        {
          if($scope.loggedin==false)
             {

                 $location.url('/login');
             }
            else{
            if($scope.followerstatus=="Follow")
            {
                $http.post("/addFollower/" + $scope.id + "/following/" + $scope.userid)
             .success(function(response){

                if(response=='success')
                   {
                     $scope.followerstatus="Unfollow";
                     getFollowers($scope.userid);
                   }
                else
                   {
                     console.log("Error Occured");
                   }
             });
          }
          else if($scope.followerstatus=="Unfollow")
          {
               $http.delete("/removefollower/" + $scope.id + "/following/" + $scope.userid)
             .success(function(response){

                if(response=='success')
                   {
                     $scope.followerstatus="Follow";
                     getFollowers($scope.userid);
                   }
                else
                   {
                     console.log("Error Occured");
                   }
             });
             }

          }
        }



         $http.get("/favchars/" + $scope.userid).success(function (response) {

        var arrays = [], size = 4;
        console.log(response);
          if(response==null ||  response=="")
             { 
                  $scope.loaded=true;
                  
             }
        if (response != null) {

            $scope.character = response;
        }
    });       
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
   

   function getFollowers(id)
    {
        $scope.followerslist=[];
        $http.get("/getfollowers/" + id)
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
    }

    


    $scope.selectCharacter = function (id) {

        $scope.favcharid = id;


    }

    
    $scope.selectComic = function (id) {

        $location.url("/comic/" + id);


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
