var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var concat = require('gulp-concat')
var jsmin = require('gulp-jsmin');
var exec = require('child_process').exec;

gulp.task('default', ['server', 'template', 'watch', 'jsConcat']);

gulp.task('watch', function(){
  gulp.watch('./views/*.jade', ['template']);
  gulp.watch('./views/templates/*.jade', ['template']);
  gulp.watch('./app/*.js', ['jsConcat']);
});

// Server start
gulp.task('server', function (cb) {
  exec('node app.js', function (err, stdout, stderr) {
    if (err) console.log(err);
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('jsConcat', function(){
  // Angular app
  gulp.src('./app/*.js')
    .pipe(concat('app.js'))
    .pipe(jsmin())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('template', function() {
  // index.html
  gulp.src('./views/*.jade')
    .pipe(jade().on('error', function(){}))
    .pipe(gulp.dest('./views/'));

  // templates
  gulp.src('./views/templates/*.jade')
    .pipe(jade().on('error', function(){}))
    .pipe(gulp.dest('./views/templates/'));
});