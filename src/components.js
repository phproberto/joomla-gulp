var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the list of the active components from paths
 *
 * @return  array
 */
function getComponents() {
	var results = [];

	if (extensions && extensions.hasOwnProperty('components')) {
		var sourceArray = extensions.components;

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(sourceArray[index]);
		}
	}

	return results;
}

/**
 * Function to ease the components
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:modules.frontend'
 *
 * @return  array
 */
function getComponentsTasks(baseTask) {
	var components = getComponents();
	var tasks = [];

	for (index = 0; index < components.length; ++index) {
	    tasks.push(baseTask + '.' + components[index]);
	}

	return tasks;
}

// Clean
gulp.task('clean:components',
	getComponentsTasks('clean:components'),
	function() {
		return true
});

// Copy
gulp.task('copy:components',
	getComponentsTasks('copy:components'),
	function() {
		return true;
});

// Watch
gulp.task('watch:components',
	getComponentsTasks('watch:components'),
	function() {
		return true;
});

exports.getComponents = getComponents;
exports.getComponentsTasks = getComponentsTasks;
