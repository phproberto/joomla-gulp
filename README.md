# Gulp build system for Joomla!

A modern build system for Joomla! extension developers.

## What is this?

Most Joomla! extensions out there still use a [Phing](http://www.phing.info/) based build system that makes the job but without using the latest technologies. [Gulp](http://gulpjs.com/) is a modern [Node.JS](http://nodejs.org/) based build system incredibly fast and easy to understand because it uses javascript code.

## <a name="plugins"></a> Some of the cool plugins available for Gulp:

* Compile LESS ([gulp-less](https://github.com/plus3network/gulp-less)) & Sass ([gulp-sass](https://www.npmjs.org/package/gulp-sass)) files on the fly
* Minify CSS ([gulp-minify-css](https://www.npmjs.org/package/gulp-minify-css)), JS ([gulp-uglify](https://www.npmjs.org/package/gulp-uglify)) files on the fly
* Concatenate files ([gulp-concat](https://www.npmjs.org/package/gulp-concat)) to mix various resources (i.e. CSS files) into one single file (and HTTP request)
* Run [CodeSniffer](http://pear.php.net/package/PHP_CodeSniffer/redirected) validations ([gulp-phpcs](https://github.com/JustBlackBird/gulp-phpcs))
* Run [JSHint](http://www.jshint.com/) validations ([gulp-jshint](https://www.npmjs.org/package/gulp-jshint))
* Run [CoffeeScript](http://coffeescript.org/) validations ([gulp-coffee](https://www.npmjs.org/package/gulp-coffee))
* Reload your browser automatically when you edit any file (including php, sass, less, js... ) ([browser-sync](http://www.browsersync.io/docs/gulp/)).
* Minify the size of the images ([gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin)) on the fly.

# Examples

* [`mod_phproberto_ghcard`](https://github.com/phproberto/mod_phproberto_ghcard).
* [`com_xpert_testimonials`](https://github.com/themexpert/xpert-testimonials)
* [`com_digicom`](https://github.com/themexpert/digicom)

Do you have a project that uses it? Contribute it to this README.

## How does it work?

This is a reusable base Gulp system for Joomla! extension development. Do not expect something magical here except that and task naming conventions. This repo is just a base system to allow you to add your extensions build scripts in a standard way so you can focus on the project specific stuff. 

This base build system does not depend on any project structure because you specify it on your extension build scripts.

The main idea of this build system is that you always develop your extensions within your extensions main folder (your project's repository). The build system copies files to your test site and reloads your browser when anything that you want to watch changes. It's easy to adapt to any workflow (like symblink folders) but it's not the native way it works.

## Documentation 

For installation and usage see the [docs folder](./docs/README.md).

## Changelog

* v1.1.1
    * Fix dependencies installed as submodules.
* v1.1.0 
    * Added support for packages.
    * Now extensions list is an independent file to allow to track it with Git.
    * Added support to fully customise browserSync settings.
    * Added `defaultTasks` config parameter to customise tasks launched by default.
* v1.0.0 
    * Initial version.

## <a name="license"></a>License

joomla-gulp is released under the MIT license. See LICENSE for details.  
