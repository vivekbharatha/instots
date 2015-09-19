'use strict';

angular.module('instots')
  .controller('HomeController', function ($scope, $http, $mdToast) {

    $scope.posts = [];
    var toastOptions = {position: 'top right', hideDelay: '2000'};

    $scope.getPosts = function(){
      $http.get('/posts').then(function(response){
        if(response.data.posts) {
          $scope.posts = response.data.posts;
          $mdToast.show($mdToast.simple(toastOptions).content('Loaded latest posts from world!'));
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
          $mdToast.show($mdToast.simple(toastOptions).content('Successfully shared your post to world!'));
          $scope.posts.unshift(postObject);
          $scope.reset();
        } else {
          $mdToast.show($mdToast.simple(toastOptions).content('An error occurred, try again! '));
        }
      });
    };

    $scope.reset();
  });
