var gulp = require('gulp');

var config = require('../../../gulp-config.json');

/**
 * Get the list of the active packages
 *
 * @return  array
 */
function getPackages() {
	var results = [];

	if (config.hasOwnProperty('extensions') && config.extensions.hasOwnProperty('packages')) {
		var sourceArray = config.extensions.packages;

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(sourceArray[index]);
		}
	}

	return results;
}

/**
 * Get packages tasks
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:modules.frontend'
 *
 * @return  array
 */
function getPackagesTasks(baseTask) {
	var packages = getPackages();
	var tasks = [];

	for (index = 0; index < packages.length; ++index) {
	    tasks.push(baseTask + '.' + packages[index]);
	}

	return tasks;
}

// Clean
gulp.task('clean:packages',
	getPackagesTasks('clean:packages'),
	function() {
		return true
});

// Copy
gulp.task('copy:packages',
	getPackagesTasks('copy:packages'),
	function() {
		return true;
});

// Watch
gulp.task('watch:packages',
	getPackagesTasks('watch:packages'),
	function() {
		return true;
});
