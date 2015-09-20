'use strict';

angular.module('instots')
  .controller('HomeController', function ($scope, $http, $mdToast) {

    $scope.posts = [];
    var toastOptions = {position: 'top right', hideDelay: '2000'};

    $scope.getPosts = function(){
      /*$http.get('/posts').then(function(response){
        if(response.data.posts) {
          $scope.posts = response.data.posts;
          $mdToast.show($mdToast.simple(toastOptions).content('Loaded latest posts from world!'));
        }
      });*/

      io.socket.get('/posts', function(resObj){
        if(resObj.posts) {
          $scope.posts = resObj.posts;
          $mdToast.show($mdToast.simple(toastOptions).content('Loaded latest posts from world!'));
        }
      });
    };

    $scope.getPosts();

    $scope.reset = function(){
      $scope.newPost = {};
      $scope.newPost.title = '';
      $scope.newPost.content = '';
      $scope.newPost.contentError = false;
    };

    $scope.post = function(newPostForm) {
      if($scope.newPost.content=='') {
        $scope.newPost.contentError = true;
        return;
      }

      var postObject = {
        title: $scope.newPost.title,
        content: $scope.newPost.content
      };

      /*$http.post('/post', postObject).then(function(response){
        if(response.data.success) {
          $mdToast.show($mdToast.simple(toastOptions).content('Successfully shared your post to world!'));
          $scope.posts.unshift(response.data.post);
          $scope.reset();
        } else {
          $mdToast.show($mdToast.simple(toastOptions).content('An error occurred, try again! '));
        }
      });*/

      io.socket.post('/post', postObject, function(resObj){
        if(resObj.success) {
          $mdToast.show($mdToast.simple(toastOptions).content('Successfully shared your post to world!'));
          $scope.posts.unshift(resObj.post);
          $scope.reset();
        } else {
          $mdToast.show($mdToast.simple(toastOptions).content('An error occurred, try again! '));
        }
        newPostForm.$setPristine();
        newPostForm.$setUntouched();
      });
    };

    $scope.reset();

    /**
     * Sails socket events
     */

    io.socket.on('post', function(obj){
      if(obj.verb == 'created') {
        $mdToast.show($mdToast.simple(toastOptions).content('A new post'));
        $scope.posts.unshift(obj.data);
      }
    });

  });
