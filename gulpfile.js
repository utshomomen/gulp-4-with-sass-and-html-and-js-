//const { src } = require('gulp');
const gulp = require ('gulp');
//image 
const imagemin = require ('gulp-imagemin');

//concat terser sourcemaps
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

//css import library
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const minifyCss = require ('gulp-clean-css')
// const postcss = require('gulp-postcss');
// const cssnano = require('cssnano');

// const autoprefixer = require('autoprefixer');

// const uglify = require ('gulp-uglify');



const{src,parallel,series,dest,watch} = require ('gulp');


function copyHtml(){

    return src('*.html').pipe(gulp.dest('dist'));

}

function imgTask(){

    return src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));

}


//minify js

const jsPath= 'src/js/*';
function jsTask() {
    return src(jsPath)
      .pipe(sourcemaps.init())
     .pipe(concat('all.js'))
      .pipe(terser())
     // .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/js'));
  }


  //minify css 


  const scssPath= 'src/sass/*';


const scssTask =() => {
    //return src(['style.css', 'style.css'])
    return src(scssPath)

    // .pipe(sourcemaps.init())
    //   .pipe(concat('style.css'))
    //   .pipe(postcss([autoprefixer()]))
    //     .pipe(cssnano())
       
    //   .pipe(sourcemaps.write('.'))

    //.pipe(minifyCss())

    .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/sass'));

  };



  function watchTask() {
    watch([scssPath, jsPath], { interval: 1000 }, parallel(scssTask, jsTask, imgTask,copyHtml));
  }
  

exports.scssTask= scssTask;
  exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.default = copyHtml 

exports.default = series(parallel(jsTask, scssTask, imgTask,copyHtml),watchTask);