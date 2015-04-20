angular.module('MarvelApp').controller('ComicController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function ($scope, $http, $location, $rootScope, $routeParams) {


$(document).ready(function()
{
	$("#overlay-for-contacts").hide();

});
    $scope.comicstatus=null;
    $http.get('/loggedin').success(function (user) {

        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            $scope.name = $rootScope.currentUser.fname;
            $scope.id = $rootScope.currentUser._id;
            $scope.reviews = null;
            $scope.loggedin = true
        }
        else {
            $scope.loggedin = false;
        }
    });

    
  

    $(".closebutton").click(function (e) {
        e.preventDefault();
        $("#overlay-for-contacts").fadeOut("slow");
    });



    $scope.bookId = $routeParams.id;
    $http.jsonp("http://gateway.marvel.com:80/v1/public/comics/" + $scope.bookId + "?apikey=7c2ea1955f73606dbc9443ac7507c3bf&&callback=JSON_CALLBACK")
    .success(function (response) {


        $scope.bookInfo = response.data.results[0];
        console.log(response.data.results[0]);
        data = response.data.results[0];
        if (response.data.results[0].description == "" || response.data.results[0].description == null) {


            $scope.bookInfo.description = "We currently do not have enough information about this comic book";

        }
       

        $http.get("/getReview/" + $scope.bookId)
        .success(function (response) {
            $scope.reviews = response;

        });


    });


    $scope.addToCart = function (book) {
       if($scope.loggedin)
       {
        var bookData = { userid: $scope.id, comicid: book.id.toString(), quantity: '1', title: book.title, price: book.prices[0].price.toString(), image: encodeURI(book.thumbnail.path + '.' + book.thumbnail.extension) };
        $http.post("/addToCart/" + $scope.id + "/name/" + book.id, bookData)
    .success(function (response) {

        if(response=='success')
          {
              $("#overlay-for-contacts").fadeIn("slow");
               $(window).scrollTop($("#overlay-for-contacts").offset().top);
           
              $scope.comicstatus='Successfully added to your cart.';
          }
        else
        {
               $("#overlay-for-contacts").fadeIn("slow");
               $(window).scrollTop($("#overlay-for-contacts").offset().top);
              $scope.comicstatus='Book already exists in your cart.';
        }

    });
    }
    else
    {

       $location.url("/login");     
    }


    }

    $scope.logout = function () {

        $http.post("/logout")
    .success(function (response) {
        $location.url("/dashboard");

    });
    }

    $scope.deleteReview = function (id,comicid) {
       $scope.rowid=id;
       $scope.comicid=comicid;
       
    }

    $scope.deleteReviewFinal = function () {
        $http.delete("/deleteReview/" + $scope.rowid + "/comic/" + $scope.comicid)
    .success(function (response) {
       
       $scope.reviews=response;

    });

    }

    $scope.addReview = function (book) {

        if($scope.loggedin)
        {
        var row = { userid: $scope.id, comicid: book.id, name: $scope.name, review: $scope.newReview, image: encodeURI(book.thumbnail.path + '.' + book.thumbnail.extension) };
        console.log(row);
        $http.post("/addReview/" + $scope.id + "/id/" + book.id, row)
        .success(function (response) {
            if (response === '0') {

              $("#overlay-for-contacts").fadeIn("slow");
               $(window).scrollTop($("#overlay-for-contacts").offset().top);
              $scope.comicstatus='You have already written a review for this book';
               
            }
            else {
                $http.get("/getReview/" + $scope.bookId)
        .success(function (response) {
            $scope.reviews = response;

        });
            }

        });

    }
    else
    {
        $location.url('/login');
    }

    }

} ]);