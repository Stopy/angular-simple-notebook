var app = angular.module('myNote', ['ngAnimate']);

app.controller('NoteController', function($scope, $rootScope, $http, noteSrv){
  $rootScope.listEnded = false;

  noteSrv.getNotes(0, function(err, data){
    if (err) return alert('Error: '+ err);
    $rootScope.listEnded = data.listEnded;
    $rootScope.notes = data.newList;
  });

  $scope.delete = function(deleteId){
    noteSrv.deleteNotes(deleteId, function(err, data){
      if (err) return alert('Error: '+ err);

      noteSrv.getNotes(0, function(err, data){
        if (err) return alert('Error: '+ err);
        $rootScope.listEnded = data.listEnded;
        $rootScope.notes = data.newList;
      });
    });
  };

  $scope.loadMore = function(count){
    noteSrv.getNotes(count, function(err, data){
      if (err) return alert('Error: '+ err);

      var list = data.newList;
      $rootScope.listEnded = data.listEnded;
      list.forEach(function(element){
        $scope.notes.push(element);
      });
    });
  };

});