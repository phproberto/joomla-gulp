var gulp = require('gulp');

// Load config
var extension = require('../../../package.json');
var config    = require('../../../gulp-config.json');

var defaultBrowserConfig = {
	proxy : "localhost"
}

// Keep B/C support for old browserSyncProxy setting
if (config.hasOwnProperty('browserSyncProxy'))
{
	defaultBrowserConfig.proxy = config.browserSyncProxy;
}

var browserConfig = config.hasOwnProperty('browserConfig') ? config.browserConfig : defaultBrowserConfig;

// Check if config has defaultTasks defined
var defaultTasks = config.hasOwnProperty('defaultTasks') ? config.defaultTasks : ['copy', 'watch', 'browser-sync'];

// Tools / Dependencies
var browserSync = require('browser-sync');
var requireDir  = require('require-dir');
var zip         = require('gulp-zip');

// Browser sync
gulp.task('browser-sync', function() {
    return browserSync(browserConfig);
});

// Clean test site
gulp.task(
	'clean',
	[
		'clean:components',
		'clean:libraries',
		'clean:media',
		'clean:modules',
		'clean:packages',
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
		'copy:packages',
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
		'watch:packages',
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
gulp.task('default', defaultTasks, function() {
});
