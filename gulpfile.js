/* eslint-disable no-undef */
const 
  gulp = require('gulp'),
  gulpsync = require('gulp-sync')(gulp),
  connect = require('gulp-connect'),
  del = require('del'),
  babel = require('gulp-babel'),

  sass = require('gulp-sass'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),

  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  babelify = require('babelify');
    
const 
  htmlMainFile = './src/index.html',
  htmlAllFiles = 'src/**/*.html',

  scssMainFile = 'src/scss/index.scss',
  scssAllFiles = 'src/scss/**/*.scss',
  scssDstDir = 'build/css',

  jsxAllFiles = 'src/jsx/**/*.jsx',
  jsAllFiles = 'src/js/**/*.js',
  jsMainFile = './src/js/index.js',
  
  jsDstDir = './build/js/';
  jsBundleFile = 'index.js';

gulp.task('connected', () => {
  connect.server({
    name: 'dashboard',
    root: 'build',
    port: 8060,
    livereload: true,
  });
});

gulp.task('clean', () => {
  return del([ './build' ]);
});

gulp.task('html', () => {
  return gulp.src(htmlMainFile)
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
});

gulp.task('scss', () => {
  return gulp.src(scssMainFile)
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(scssDstDir))
    .pipe(connect.reload());
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

gulp.task('build', ['html', 'scss', 'js'], () => {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'));
  gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./build/img/'));
  gulp.src('./src/json/**/*.*')
    .pipe(gulp.dest('./build/json/'));
  gulp.src('./src/**/normalize.css')
    .pipe(gulp.dest('./build/'));
});

gulp.task('watcher', () => {
  gulp.watch(htmlAllFiles, ['html']);
  gulp.watch(jsxAllFiles, ['js']);
  gulp.watch(scssAllFiles, ['scss']);
});

let develop = ['clean', 'build', 'connected', 'watcher'];
let production = ['clean', 'build'];

gulp.task('dev', gulpsync.sync(develop));
gulp.task('prod', gulpsync.sync(production));
