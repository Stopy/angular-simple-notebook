// Для модальных окон похимичить с rootScope --- old solution
// Кажется, у одной и той же директивы в разных местах одна и та же область видимости --- ошибся
// Нужно порыть чужие решения
// Сделал через рутскоуп, не доволен


app.directive('toggleElem', function(){
  return {
    restrict: 'A',
    controller: function($scope){
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
    controller: function($rootScope, $scope, $http){
      $rootScope.shows = {};

      $scope.open = function(windowName, updateId){
        $rootScope.shows[windowName] = true;
        $rootScope.updateId = updateId;
      };

      $scope.close = function(){
        $rootScope.shows = {};
      };

      $scope.send = function(){
        $http.put('/note', {updateId: $scope.updateId, name: $scope.name, body: $scope.body}).
        success(function(data){
          $scope.close();
          $scope.name = '';
          $scope.body = '';
          $http.get('/notes').
          success(function(data){
            $rootScope.notes = data;
          }).
          error(function(data){
            alert('Error: ' + data);
          });
        }).
        error(function(data){
          alert('Error: ' + data);
        });
      };
    }
  };
});