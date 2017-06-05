'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const jade = require('gulp-jade');
const notify = require('gulp-notify');
var paths = {
  scss:['./scss/main.scss'],
  jade:['./*.jade']
};


gulp.task('jade',function(done){
   gulp.src('./*.jade')
    .on('data',function(file){
        console.log({
            relative: file.relative,
            contents: file.contents
        })
    })
        .pipe(jade())
        .pipe(gulp.dest('./build'));
done();
});

gulp.task('scss', function () {
 return gulp.src('./scss/main.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./build/css'));
});

gulp.task('build', gulp.parallel('jade','scss',function(done){
    done();
}));

gulp.task('build:watch',function(){
    gulp.watch(paths.jade,gulp.series('jade'));
    gulp.watch(paths.scss,gulp.series('scss'));
    
});