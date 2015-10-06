app.factory('noteSrv',function($http){

/**
* Basic queries to REST api
* * * * * * * *
* getNotes(cb) without arguments except callback
* addNotes(note,cb) with JSON argument and callback
* deleteNotes(deleteId,cb) argument with removable id and callback
* updateNotes(data,cb) first argument is a new body of the updated note and second is the JSON object with data about my missiles, which I keep in the garage... or it's just callback, not sure
*/

  return {
    getNotes: function(count,cb){
      var count = count || '';
      $http.get('/notes/'+count).
      success(function(data){
        cb(null, data);
      }).
      error(function(data){
        cb(data);
      });
    },

    addNotes: function(note, cb){
      var self = this;
      $http.post('/note', note).
      success(function(data){
        self.getNotes(0, cb);
      }).
      error(function(data){
        cb(data);
      });
    },

    deleteNotes: function(deleteId, cb){
      var self = this;
      $http.delete('/note/'+deleteId).
      success(function(){
        self.getNotes(0, cb);
      }).
      error(function(data){
        cb(data);
      });
    },

    updateNotes: function(data, cb){
      var self = this;
      $http.put('/note', data).
      success(function(data){
        self.getNotes(0, cb);
      }).
      error(function(data){
        cb(data);
      });
    },
  };
});