'use strict';

angular.module('instots')
  .controller('HomeController', function ($scope, $http) {

    $scope.posts = [];

    $scope.getPosts = function(){
      $http.get('/posts').then(function(response){
        if(response.data.posts) {

          $scope.posts = response.data.posts;
        }
      });
    };

    $scope.getPosts();

    $scope.reset = function(){
      $scope.newPost = {};
      $scope.newPost.title = '';
      $scope.newPost.content = '';
    };

    $scope.post = function() {
      var postObject = {
        title: $scope.newPost.title,
        content: $scope.newPost.content
      };

      $http.post('/post', postObject).then(function(response){
        if(response.data.success) {
          $scope.posts.push(postObject);
        }
      });
    };

    $scope.reset();
  });
