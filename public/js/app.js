
angular.module('MarvelApp', ['ngRoute', 'door3.css']).config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
      when('/', {
          templateUrl: 'partials/signup.html',
          css: 'css/signup.css',
          controller: 'SignUpController'
      }).
      when('/character', {
          templateUrl: 'partials/characters.html',
          css: 'css/characters.css',
          controller: 'MarvelController'
      }).
       when('/login', {
           templateUrl: 'partials/login.html',
           controller: 'LoginController',
           css:'css/login.css'
       }).
       when('/movie', {
           templateUrl: 'partials/movie.html',
           controller: 'MovieController'
       }).
       when('/view/:id', {
           templateUrl: 'partials/viewprofile.html',
           controller: 'ViewController',
           css:'css/personal.css'
       }).
        when('/personal', {
            resolve:
           { loggedin: function ($q, $timeout, $http, $location, $rootScope) {


               var deferred = $q.defer();
               $http.get('/loggedin').success(function (user) {

                   $rootScope.errorMessage = null;
                   if (user !== '0') {
                       $rootScope.currentUser = user;
                       deferred.resolve();
                   }
                   else {

                       $rootScope.errorMessage = 'You need to log in';
                       deferred.reject();
                       $location.url('/login');
                   }
               });
           }
           },
            templateUrl: 'partials/personal.html',
            controller: 'PersonalController',
            css: 'css/personal.css'
        }).
       when('/movieupdate', {
           templateUrl: 'partials/movieupdate.html',
           controller: 'MovieUpdateController'
       }).
        when('/portfolio/:id', {
            templateUrl: 'partials/portfolio.html',
            controller: 'PortfolioController',
            css: 'css/profile.css'
        }).
         when('/comic/:id', {
             templateUrl: 'partials/comic.html',
             controller: 'ComicController',
             css: 'css/comic.css'
         }).
          when('/comics', {
              templateUrl: 'partials/comics.html',
              controller: 'ComicsController',
              css: 'css/comics.css'
          }).
          when('/cart', {


              templateUrl: 'partials/cart.html',
              controller: 'CartController',
              css: 'css/cart.css',
              resolve:
           { loggedin: function ($q, $timeout, $http, $location, $rootScope) {


               var deferred = $q.defer();
               $http.get('/loggedin').success(function (user) {

                   $rootScope.errorMessage = null;
                   if (user !== '0') {
                       $rootScope.currentUser = user;
                       deferred.resolve();
                   }
                   else {

                       $rootScope.errorMessage = 'You need to log in';
                       deferred.reject();
                       $location.url('/login');
                   }
               });
           }
           }
          }).
       when('/dashboard', {

           templateUrl: 'partials/dashboard.html',
           css: 'css/dashboard.css',
           controller: 'DashboardController'
       }).
      otherwise({
          redirectTo: '/'
      });

  } ]);


