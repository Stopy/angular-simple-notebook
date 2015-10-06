var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secretString',
  cookie: { maxAge: 3600000 * 12 , httpOnly: true}, // Сессия на 12 часов
  resave: true,
  saveUninitialized: false
}));
app.use("/", express.static(__dirname + '/public'));
app.use("/templates", express.static(__dirname + '/views/templates'));
console.log(process.env.NODE_ENV || 'development');

var server = app.listen(8080, function () {

  var id = 5;
  var notes = [
  {id: 0, name: 'Hey', body: "I'm body"},
  {id: 1, name: 'Hey you', body: "I'm body"},
  {id: 2, name: 'Hey 1', body: "I'm body"},
  {id: 3, name: 'Hey you 2', body: "I'm body"},
  {id: 4, name: 'Hey 3', body: "I'm body"},
  {id: 5, name: 'Hey you 4', body: "I'm body"}];

  app.get('/', function(req,res,next){
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/notes/:count?', function(req,res,next){
    var count = parseInt(req.params.count) || 0;
    var newList = [];
    var listEnded = false;
    for (var i = count; i < count + 3 && i < notes.length; i++) {
      newList.push(notes[i]);
      if (i+1 === notes.length) {
        listEnded = true;
      }
    }
    res.json({newList:newList, listEnded: listEnded});
  });

  app.post('/note', function(req,res,next){
    id++;
    req.body.id = id;
    notes.splice(0,0,req.body);
    console.log('Added: id = ' + id);
    res.end();
  });

  app.put('/note', function(req,res,next){
    for (note in notes) {
      if (notes[note].id === req.body.updateId) {
        notes[note].name = req.body.name;
        notes[note].body = req.body.body;
        console.log('Updated: id = ' + notes[note].id);
        break;
      }
    }
    res.end();
  });

  app.delete('/note/:id', function(req,res,next){
    for (note in notes) {
      if (notes[note].id == req.params.id) {
        notes.splice(note, 1);
        console.log('Deleted: id = ' + note);
      }
    }
    res.end();
  });

  app.use(function(req,res,next){
    res.end('<h1>404 not found!</h1>');
  });

  console.log('Server is running at ' + server.address().port);
});