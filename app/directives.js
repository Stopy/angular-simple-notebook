app.directive('toggleElem', function(){
  return {
    restrict: 'A',
    controller: function($scope){ // For the visibility settings of DOM elements
      $scope.visible = true;

      $scope.toggle = function(){
        $scope.visible = ($scope.visible) ? false : true
      };
    }
  };
});

app.directive('modalWindow', function(){
  return {
    restrict: 'A',
    scope: true,
    controller: function($rootScope, $scope, $http, noteSrv){
      $rootScope.shows = {};
      $scope.open = function(windowName, updateId){ // Open a modal window
        $rootScope.shows = {}; // Reset windows
        $rootScope.shows[windowName] = true;
        $rootScope.updateId = updateId;
      };

      $scope.close = function(){ // Close all modal windows
        $rootScope.shows = {};
      };

      $scope.update = function(){ // Send an updated note
        var note = {};
        note.updateId = $rootScope.updateId;
        note.name = $scope.name;
        note.body = $scope.body;
        noteSrv.updateNotes(note, function(err, data){
          if (err) return alert(err);
          $scope.close(); // Close modal window
          $scope.name = '';
          $scope.body = '';
          $rootScope.notes = data.newList;
        });
      };

      $scope.send = function(){
        var note = {};
        note.name = $scope.name;
        note.body = $scope.body;
        noteSrv.addNotes(note, function(err, data){
          if (err) return alert('Error: '+ data);
          $rootScope.notes = data.newList;
          $rootScope.listEnded = data.listEnded;
          $scope.name = '';
          $scope.body = '';
        });
      };

    }
  };
});