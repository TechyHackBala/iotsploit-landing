var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	precss = require('precss'),
	sass = require('gulp-sass'),
	cssnano = require('cssnano'),
	minify = require('gulp-minify'),
	concat = require('gulp-concat');

var staticFolder = "./static/";

gulp.task('css', function () {
	var processors = [
		autoprefixer,
		cssnano(),
		precss
	];
	return gulp.src(staticFolder +'styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest(staticFolder +'dist/'));
});

gulp.task('css-libs', function () {
		var processors = [
				autoprefixer,
				cssnano(),
				precss
		];
		return gulp.src(staticFolder +'styles/vendor/*.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(postcss(processors))
				.pipe(gulp.dest(staticFolder +'dist/'));
});

gulp.task('scripts', function() {
	var scripts = [
		staticFolder +'scripts/scripts.js'
	];
    return gulp.src(scripts)
		.pipe(concat('scripts.js'))
		.pipe(minify({
				ext:{
						min:'-min.js'
				}
		}))
		.pipe(gulp.dest(staticFolder +'dist/'));
});

gulp.task('libraries', function() {
		var scripts = [
				staticFolder +'scripts/vendor/jquery-3.1.1.min.js',
				staticFolder +'scripts/vendor/select2.full.min.js'
		];
		return gulp.src(scripts)
				.pipe(concat('libraries.js'))
				.pipe(minify({
						ext:{
								min:'-min.js'
						}
				}))
				.pipe(gulp.dest(staticFolder +'dist/'));
});


gulp.task('watch', function() {
	gulp.watch(staticFolder +'styles/*.scss', ['css']);
	gulp.watch(staticFolder +'scripts/*.js', ['scripts'])
});

gulp.task('build', ['css', 'css-libs', 'libraries', 'scripts']);

