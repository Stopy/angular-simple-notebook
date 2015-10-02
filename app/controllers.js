var app = angular.module('myNote', ['ngAnimate']);

app.controller('NoteController', function($scope, $rootScope, $http, noteSrv){
  noteSrv.getNotes(function(err, data){
    if (err) return alert('Error: '+ data);
    $rootScope.notes = data;
  });

  $scope.delete = function(deleteId){
    noteSrv.deleteNotes(deleteId, function(err, data){
      if (err) return alert('Error: '+ data);
      $rootScope.notes = data;
    });
  };

  $scope.send = function(){
    var note = {};
    note.name = $scope.name;
    note.body = $scope.body;
    noteSrv.addNotes(note, function(err, data){
      if (err) return alert('Error: '+ data);
      $rootScope.notes = data;
      $scope.toggle();
      $scope.name = '';
      $scope.body = '';
    });

  };

});