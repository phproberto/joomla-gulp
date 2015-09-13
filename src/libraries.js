var gulp = require('gulp');

var config = require('../../../gulp-config-extensions.json');

/**
 * Get the list of libraries
 *
 * @return  array
 */
function getLibraries() {
	var results = [];

	if (config.hasOwnProperty('libraries')) {
		var sourceArray = config.libraries;

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(sourceArray[index]);
		}
	}

	return results;
}

/**
 * Function to get the tasks to execute on libraries
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:libraries'
 *
 * @return  array
 */
function getLibrariesTasks(baseTask) {
	var libraries = getLibraries();
	var tasks = [];

	for (index = 0; index < libraries.length; ++index) {
	    tasks.push(baseTask + '.' + libraries[index]);
	}

	return tasks;
}

// Clean
gulp.task('clean:libraries',
	getLibrariesTasks('clean:libraries'),
	function() {
		return true;
});

// Copy
gulp.task('copy:libraries',
	getLibrariesTasks('copy:libraries'),
	function() {
		return true;
});

// Watch
gulp.task('watch:libraries',
	getLibrariesTasks('watch:libraries'),
	function() {
		return true;
});
