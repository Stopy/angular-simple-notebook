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
        $rootScope.shows[windowName] = true;
        $rootScope.updateId = updateId;
      };

      $scope.close = function(){ // Close all modal windows
        $rootScope.shows = {};
      };

      $scope.send = function(){ // Send an updated note
        noteSrv.updateNotes(
          {updateId: $scope.updateId,
          name: $scope.name,
          body: $scope.body}, function(err, data){
          if (err) return alert(err);
          $scope.close(); // Close modal window
          $scope.name = '';
          $scope.body = '';
          $rootScope.notes = data;
        });
      };
    }
  };
});