/* eslint-disable no-undef */
const gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    connect = require('gulp-connect'),
    del = require('del'),
    babel = require('gulp-babel'),

    eslint = require('gulp-eslint');
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline,
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify');
    
const htmlMainFile = './src/index.html',
    jsMainFile = './src/js/index.js',

    htmlAllFiles = 'src/**/*.html',
    jsAllFiles = 'src/js/**/*.js',
    jsxAllFiles = 'src/jsx/**/*.jsx',
    
    jsDstDir = './build/js/';
    jsBundleFile = 'index.js';

gulp.task('clean', () => {
  return del([ './build' ]);
});

gulp.task('eslint', function () {
  return gulp.src([jsAllFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('html', () => {
  return gulp.src(htmlMainFile)
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
});

gulp.task('connected', () => {
  connect.server({
    name: 'dashboard',
    root: 'build',
    port: 8060,
    livereload: true,
  });
});

gulp.task("babel", function(){
  return gulp.src(jsxAllFiles)
      .pipe(babel({
          plugins: ['transform-react-jsx']
      }))
      .pipe(gulp.dest("src/js/"));
});

gulp.task('js', ['babel'], function() {
  return browserify({ entries: jsMainFile })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source(jsBundleFile))
    .pipe(gulp.dest(jsDstDir))
    .pipe(connect.reload());
});

gulp.task('watcher', () => {
  gulp.watch(htmlAllFiles, ['html']);
  gulp.watch(jsxAllFiles, ['js']);
});

let develop = ['clean', 'html', 'js', 'connected', 'watcher'];
let production = ['clean', 'html', 'js'];

gulp.task('dev', gulpsync.sync(develop));
gulp.task('prod', gulpsync.sync(production));
