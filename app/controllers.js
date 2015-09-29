var app = angular.module('myNote', ['ngAnimate']);

app.controller('NoteController', function($scope, $rootScope, $http){

  $http.get('/notes').
  success(function(data){
    $rootScope.notes = data;
  }).
  error(function(data){
    alert('Error: ' + data);
  });

  $scope.delete = function(data){
    $http.delete('/note/'+data).
    success(function(){
      $http.get('/notes').
      success(function(data){ $rootScope.notes = data; }).
      error(function(data){ alert('Error: ' + data); });
    }).
    error(function(data){
      alert('Error: ' + data);
    });
  };

  $scope.send = function(){
    var note = {};

    note.name = $scope.name;
    note.body = $scope.body;
    $http.post('/note', note).
    success(function(data){
      $http.get('/notes').
      success(function(data){
        $rootScope.notes = data;
        $scope.toggle();
        $scope.name = '';
        $scope.body = '';
      }).
      error(function(data){
        alert('Error: ' + data);
      });
    }).
    error(function(data){
      alert('Error: ' + data);
    });
  };

});