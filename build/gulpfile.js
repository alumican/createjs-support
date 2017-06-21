'use strict';

//----------------------------------------
var SRC_DIR = '../src';
var DST_DIR = '../lib';

var SRC_FILENAME = 'reference';
var DST_FILENAME = 'createjs-support';

//----------------------------------------
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

//----------------------------------------
gulp.task('compile', function() {
	return gulp.src([SRC_DIR + SRC_FILENAME])
		.pipe(plumber())
		.pipe(sourcemaps.init('./'))
		.pipe(typescript({ target: 'ES5', removeComments: true, declaration: true, outFile: DST_FILENAME + '.js' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DST_DIR));
});

//----------------------------------------
gulp.task('compile-min', function() {
	return gulp.src([SRC_DIR + SRC_FILENAME])
		.pipe(plumber())
		.pipe(sourcemaps.init('./'))
		.pipe(typescript({ target: 'ES5', removeComments: true, outFile: DST_FILENAME + '.min.js' }))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DST_DIR));
});

//----------------------------------------
gulp.task('watch', function() {
	gulp.watch(SRC_DIR + '/**/*.ts', gulp.series(['compile', 'compile-min']));
});

//----------------------------------------
gulp.task('default', gulp.parallel(['compile', 'compile-min', 'watch']));