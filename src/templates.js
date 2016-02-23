var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the available templates
 *
 * @param   string  app  'frontend' | 'backend'
 *
 * @return  array
 */
function getTemplates(app) {
	var results = [];

	if (extensions && extensions.hasOwnProperty('templates')
		&& extensions.templates.hasOwnProperty(app)
	) {
		var sourceArray = extensions.templates[app];

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(app + '.' + sourceArray[index]);
		}
	}

	return results;
}

/**
 * Function to get the tasks to execute
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:templates'
 *
 * @return  array
 */
function getTemplatesTasks(baseTask, app) {
	var tasks = [];
	var templates = getTemplates(app);

	if (templates) {
		for (index = 0; index < templates.length; ++index) {
		    tasks.push(baseTask + '.' + templates[index]);
		}
	}

	return tasks;
}

// Clean test site
gulp.task('clean:templates',
	['clean:templates.frontend', 'clean:templates.backend'],
	function() {
		return true
});
gulp.task('clean:templates.frontend',
	getTemplatesTasks('clean:templates', 'frontend'),
	function() {
		return true;
});
gulp.task('clean:templates.backend',
	getTemplatesTasks('clean:templates', 'backend'),
	function() {
		return true;
});

// Copy to test site
gulp.task('copy:templates',
	['copy:templates.frontend', 'copy:templates.backend'],
	function() {
		return true;
});
gulp.task('copy:templates.frontend',
	getTemplatesTasks('copy:templates', 'frontend'),
	function() {
		return true;
});
gulp.task('copy:templates.backend',
	getTemplatesTasks('copy:templates', 'backend'),
	function() {
		return true;
});

// Watch
gulp.task('watch:templates',
	['watch:templates.frontend', 'watch:templates.backend'],
	function() {
		return true;
});
gulp.task('watch:templates.frontend',
	getTemplatesTasks('watch:templates', 'frontend'),
	function() {
		return true;
});
gulp.task('watch:templates.backend',
	getTemplatesTasks('watch:templates', 'backend'),
	function() {
		return true;
});

exports.getTemplates = getTemplates;
exports.getTemplatesTasks = getTemplatesTasks;
