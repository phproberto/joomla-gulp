var gulp = require('gulp');

// Load config
var extension = require('../../../package.json');
var config    = require('../../../gulp-config.json');

// Tools / Dependencies
var browserSync = require('browser-sync');
var requireDir  = require('require-dir');
var zip         = require('gulp-zip');

var browser = config.hasOwnProperty('browser') ? config.browser : "default";

// Browser sync
gulp.task('browser-sync', function() {
	return browserSync({
		proxy: config.browserSyncProxy,
		browser: browser
    });
});

// Clean test site
gulp.task(
	'clean',
	[
		'clean:components',
		'clean:libraries',
		'clean:media',
		'clean:modules',
		'clean:plugins',
		'clean:templates'
	], function() {
		return true;
});

// Copy to test site
gulp.task('copy', [
		'copy:components',
		'copy:libraries',
		'copy:media',
		'copy:modules',
		'copy:plugins',
		'copy:templates'
	], function() {
		return true;
});

// Watch for file changes
gulp.task('watch', [
		'watch:components',
		'watch:libraries',
		'watch:media',
		'watch:modules',
		'watch:plugins',
		'watch:templates'
	], function() {
		return true;
});

gulp.task('release', function () {
	return gulp.src([
			'./**/*',
			'./**/.*',
			"!./**/.gitignore",
			"!./**/scss/**",
			"!./**/less/**",
			"!./**/build.*",
			"!./**/build/**",
			"!./**/CONTRIBUTING.md",
			"!./**/docs/**",
			"!./**/joomla-gulp/**",
			"!./**/joomla-gulp-extensions/**",
			"!./**/gulp**",
			"!./**/gulp**/**",
			"!./**/gulpfile.js",
			"!./**/node_modules/**",
			"!./**/node_modules/**/.*",
			"!./**/package.json",
			"!./**/releases/**",
			"!./**/releases/**/.*",
			"!./**/*.sublime-*",
		])
		.pipe(zip(extension.name + '-' + extension.version + '.zip'))
		.pipe(gulp.dest('releases'));
});

// Default task
gulp.task('default', ['copy', 'watch', 'browser-sync'], function() {
});
