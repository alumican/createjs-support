'use strict';

//----------------------------------------
var SRC_DIR = '../src';
var DST_DIR = '../deploy';

//----------------------------------------
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');

//----------------------------------------
gulp.task('typescript', function() {
	return gulp.src([SRC_DIR + '/script/main.ts'])
		.pipe(plumber())
		.pipe(sourcemaps.init('./'))
		.pipe(typescript({ target: 'ES5', removeComments: true, outFile: 'main.js' }))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DST_DIR + '/script'));
});

//----------------------------------------
gulp.task('sass', function () {
	return gulp.src(SRC_DIR + '/style/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCss())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DST_DIR + '/style'));
});

//----------------------------------------
gulp.task('clip', function () {
	return gulp.src(SRC_DIR + '/clip/**/*.!(fla|html)')
		.pipe(plumber())
		.pipe(gulp.dest(DST_DIR + '/clip'));
});

//----------------------------------------
gulp.task('watch', function() {
	gulp.watch(SRC_DIR + '/script/**/*.ts', gulp.series(['typescript']));
	gulp.watch(SRC_DIR + '/style/*.scss', gulp.series(['sass']));
	gulp.watch(SRC_DIR + '/clip/**/*.!(fla|html)', gulp.series(['clip']));
});

//----------------------------------------
gulp.task('default', gulp.parallel(['typescript', 'sass', 'clip', 'watch']));




