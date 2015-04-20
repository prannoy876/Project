var app = angular.module("PostApp", ['ngResource']);

app.controller("PostCtrl", function ($scope, $resource) {


    $scope.posts = [{ id: '1', post: 'This is Post 1' },
                   { id: '2', post: 'This is Post 2' },
                   { id: '3', post: 'This is Post 3' },
                   { id: '4', post: 'This is Post 4'}];

    $scope.comments=[{id:'1', comment:'This is comment 1 for post 1'},
                     {id:'1', comment:'This is comment 2 for post 1'},
                     {id:'2', comment:'This is comment 1 for post 2'},
                     {id:'2', comment:'This is comment 2 for post 2'},
                     {id:'2', comment:'This is comment 3 for post 2'},
                     {id:'3', comment:'This is comment 1 for post 3'},
                     {id:'3', comment:'This is comment 1 for post 3'}];

});
  

  

