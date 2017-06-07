'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const jade = require('gulp-jade');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
var clean = require('gulp-clean');
const scss = require('gulp-scss');
var mainBowerFiles = require('gulp-main-bower-files');
var googlecdn = require('gulp-google-cdn');

 
 
gulp.task('clean', function (done) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
done();
});

gulp.task('font', function (done) {

    gulp.src(mainfiles(['**/*.{otf, ttf, woff2, eot, svg}'],{
      'overrides':{
        'font-awesome':{
          main:['fonts/*.*']
        },
        "bootstrap-sass":{
          'main':["assets/fonts/bootstrap/*.*"]
        }
      }
    }))
   .pipe(gulp.dest('./build/fonts'))
done();
});

gulp.task('js', function(done){
  gulp.src(mainfiles(['**/*.js'],{
    'overrides':{
      'jquery':{
        main:['assets/javascripts/bootstrap.min.js']
      },
      'jquery':{
        'main':["./dist/jquery.min.js"]
      },
      'jquery-migrate':{
        'main':["./jquery-migrate.min.js"]
      }
    }
  }))
     .pipe(gulp.dest('./build/js'))
done();
});

// компиляция sass
gulp.task('sass',function (done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
done();
});

gulp.task('scss', function () {
 return gulp.src('./scss/*.*')
  .pipe(sass().on('error', sass.logError))    
  .pipe(autoprefixer({
      browsers: ['> 1%','not ie < 8','last 5 versions'],
      cascade: false
  }))
  .pipe(gulp.dest('./build/css'))
});

gulp.task('scss', function(done){
	return gulp.src('./scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./css'))
	done();
});
 


gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('jade', function(){
	return gulp.src('./src/*.jade')
		.pipe(jade({
       pretty: true
    }
      ))
		.pipe(gulp.dest('./build'));
	done();
});

