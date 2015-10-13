'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

/*
 * JavaScript file paths used in tasks.
 */
const paths = {
  js: [
    'server.js', 'config.js', 'gulpfile.js', 
    'app/**/*.js','!app/**/*.spec.js'
  ],
  ignore: []
};

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('watch', function () {
  watch([].concat(paths.js), function () {
    gulp.start(['lint']);
  });
});

gulp.task('lint', function () {
  return gulp.src([].concat(paths.js))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', function () {
  gulp.src(paths.js.concat(paths.ignore))
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['app/**/*.spec.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', function() {
          process.exit(0);
        });
    });
});

gulp.task('dev', ['lint', 'server', 'watch']);
