var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the list of libraries
 *
 * @return  array
 */
function getMedia() {
	var results = [];

	if (extensions && extensions.hasOwnProperty('media')) {
		var sourceArray = extensions.media;

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(sourceArray[index]);
		}
	}

	return results;
}

/**
 * Function to get the tasks to execute
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:media'
 *
 * @return  array
 */
function getMediaTasks(baseTask) {
	var media = getMedia();
	var tasks = [];

	for (index = 0; index < media.length; ++index) {
	    tasks.push(baseTask + '.' + media[index]);
	}

	return tasks;
}

// Clean test site
gulp.task('clean:media',
	getMediaTasks('clean:media'),
	function() {
		return true
});

// Copy to test site
gulp.task('copy:media',
	getMediaTasks('copy:media'),
	function() {
		return true;
});

// Watch
gulp.task('watch:media',
	getMediaTasks('watch:media'),
	function() {
		return true;
});

exports.getMedia = getMedia;
exports.getMediaTasks = getMediaTasks;
