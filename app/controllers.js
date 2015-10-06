var app = angular.module('myNote', ['ngAnimate']);

app.controller('NoteController', function($scope, $rootScope, $http, noteSrv){
  $scope.listEnded = false;

  noteSrv.getNotes(0, function(err, data){
    if (err) return alert('Error: '+ err);
    $scope.listEnded = data.listEnded;
    $rootScope.notes = data.newList;
  });

  $scope.delete = function(deleteId){
    noteSrv.deleteNotes(deleteId, function(err, data){
      if (err) return alert('Error: '+ err);
      $rootScope.notes = data;
    });
  };

  $scope.loadMore = function(count){
    noteSrv.getNotes(count, function(err, data){
      if (err) return alert('Error: '+ err);

      var list = data.newList;
      $scope.listEnded = data.listEnded;
      list.forEach(function(element){
        $scope.notes.push(element);
      });
    });
  };

});