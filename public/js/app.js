
var app=angular.module('myNote',['ngAnimate']);app.controller('NoteController',function($scope,$rootScope,$http,noteSrv){$rootScope.listEnded=false;noteSrv.getNotes(0,function(err,data){if(err)return alert('Error: '+err);$rootScope.listEnded=data.listEnded;$rootScope.notes=data.newList;});$scope.delete=function(deleteId){noteSrv.deleteNotes(deleteId,function(err,data){if(err)return alert('Error: '+err);noteSrv.getNotes(0,function(err,data){if(err)return alert('Error: '+err);$rootScope.listEnded=data.listEnded;$rootScope.notes=data.newList;});});};$scope.loadMore=function(count){noteSrv.getNotes(count,function(err,data){if(err)return alert('Error: '+err);var list=data.newList;$rootScope.listEnded=data.listEnded;list.forEach(function(element){$scope.notes.push(element);});});};});app.directive('toggleElem',function(){return{restrict:'A',controller:function($scope){$scope.visible=true;$scope.toggle=function(){$scope.visible=($scope.visible)?false:true};}};});app.directive('modalWindow',function(){return{restrict:'A',scope:true,controller:function($rootScope,$scope,$http,noteSrv){$rootScope.shows={};$scope.open=function(windowName,updateId){$rootScope.shows={};$rootScope.shows[windowName]=true;$rootScope.updateId=updateId;};$scope.close=function(){$rootScope.shows={};};$scope.update=function(){var note={};note.updateId=$rootScope.updateId;note.name=$scope.name;note.body=$scope.body;noteSrv.updateNotes(note,function(err,data){if(err)return alert(err);$scope.close();$scope.name='';$scope.body='';$rootScope.notes=data.newList;});};$scope.send=function(){var note={};note.name=$scope.name;note.body=$scope.body;noteSrv.addNotes(note,function(err,data){if(err)return alert('Error: '+data);$rootScope.notes=data.newList;$rootScope.listEnded=data.listEnded;$scope.name='';$scope.body='';});};}};});app.factory('noteSrv',function($http){return{getNotes:function(count,cb){var count=count||'';$http.get('/notes/'+count).success(function(data){cb(null,data);}).error(function(data){cb(data);});},addNotes:function(note,cb){var self=this;$http.post('/note',note).success(function(data){self.getNotes(0,cb);}).error(function(data){cb(data);});},deleteNotes:function(deleteId,cb){var self=this;$http.delete('/note/'+deleteId).success(function(){self.getNotes(0,cb);}).error(function(data){cb(data);});},updateNotes:function(data,cb){var self=this;$http.put('/note',data).success(function(data){self.getNotes(0,cb);}).error(function(data){cb(data);});},};});