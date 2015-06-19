# Gulp build system for Joomla!

Develop faster

## Index  

1. [What is this?](#whats-this)
2. [How does it work?](#how-works)
3. [Install](#install)
    1. [Clone this repo in your project](#clone)
    2. [Install node.JS](#install-node)
    3. [Install Gulp](#install-gulp)
    4. [Initialise your project's package.json file](#initialise-package)
    5. [Install joomla-gulp requirements](#install-joomla-gulp)
    6. [Install your favorite Gulp plugins](#install-gulp-plugins)
    7. [Create your joomla-gulp-extensions folder](#create-gulp-extensions)
    8. [Create your config](#create-config)
    9. [Create your gulpfile.js](#create-gulpfile)
    10. [Start writing extensions](#start-writing-extensions)
4. [Naming conventions](#naming-conventions)
    1. [Main level](#main-level)
    2. [Second level](#second-level)
    3. [Third level](#third-level)
    3. [Fourth level](#fourth-level)
5. [License](#license)

## <a name="whats-this"></a>1. What is this?

Most Joomla! extensions out there still use a [Phing](http://www.phing.info/) based build system that makes the job but without using the latest technologies. [Gulp](http://gulpjs.com/) is a modern [Node.JS](http://nodejs.org/) based build system incredibly fast and easy to understand because it uses javascript code.

### <a name="plugins"></a>Some of the cool plugins available for Gulp:

* Compile LESS ([gulp-less](https://github.com/plus3network/gulp-less)) & Sass ([gulp-sass](https://www.npmjs.org/package/gulp-sass)) files on the fly
* Minify CSS ([gulp-minify-css](https://www.npmjs.org/package/gulp-minify-css)), JS ([gulp-uglify](https://www.npmjs.org/package/gulp-uglify)) files on the fly
* Concatenate files ([gulp-concat](https://www.npmjs.org/package/gulp-concat)) to mix various resources (i.e. CSS files) into one single file (and HTTP request)
* Run [CodeSniffer](http://pear.php.net/package/PHP_CodeSniffer/redirected) validations ([gulp-phpcs](https://github.com/JustBlackBird/gulp-phpcs))
* Run [JSHint](http://www.jshint.com/) validations ([gulp-jshint](https://www.npmjs.org/package/gulp-jshint))
* Run [CoffeeScript](http://coffeescript.org/) validations ([gulp-coffee](https://www.npmjs.org/package/gulp-coffee))
* Reload your browser automatically when you edit any file (including php, sass, less, js... ) ([browser-sync](http://www.browsersync.io/docs/gulp/)).
* Minify the size of the images ([gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin)) on the fly.

These are mainly the tools I use and the tools I think we should move forward but are you missing something? Suggest it!

## <a name="how-works"></a>2. How does it work?

This is a reusable base Gulp system for Joomla! extension development. Do not expect something magical here except that and task naming conventions. This repo is just a base system to allow you to add your extensions build scripts in a standard way so you can focus on the project specific stuff. 

This base build system does not depend on any project structure because you specify it on your extension build scripts.

The main idea of this build system is that you always develop your extensions within your extensions main folder (your project's repository). The build system copies files to your test site and reloads your browser when anything that you want to watch changes. It's easy to adapt to any workflow (like symblink folders) but it's not the native way it works.

## <a name="install"></a>3. Install

### <a name="install-node"></a>3.1. Install node.js

I won't extend here. Visit http://nodejs.org/ or search google.

### <a name="initialise-package"></a>3.2. Initialise your project's package.json file

On your project's folder run:

`npm init`

That will create a package.json file with the information that you provide.  

### <a name="install-joomla-gulp"></a>3.3. Install joomla-gulp

In your project's root:

`npm install --save-dev joomla-gulp`

### <a name="install-gulp"></a>3.4. Install Gulp
Install Gulp globally so it's available in all your projects:  
`sudo npm install -g gulp`  

Install Gulp on your project's folder:  
`npm install --save-dev gulp`  

### <a name="install-joomla-gulp"></a>3.5. Install joomla-gulp requirements

This project only has 3 dependencies. You can install them from your project's root:

`npm install --save-dev browser-sync gulp-zip require-dir`

### <a name="install-gulp-plugins"></a>3.6. Install your favorite Gulp plugins

I recommend you to look at this [readme's list of available extensions](#plugins). to start with. You can install any of them with:

`npm install {EXTENSION} --save-dev`

For example to install the Sass compiler:

`npm install gulp-sass --save-dev`

### <a name="create-gulp-extensions"></a>3.7. Copy sample files and directories

Copy the sample files and directories into your project root's folder:

    cp node_modules/joomla-gulp/gulp-config.json.sample gulp-config.json
    cp node_modules/joomla-gulp/gulpfile.js.sample gulpfile.js
    cp -rT node_modules/joomla-gulp/joomla-gulp-extensions-sample joomla-gulp-extensions

### <a name="create-config"></a>3.8. Create your config file

Customise the params inside of `gulp-config.json` to fit your project requirements.

#### Configuration options

* **wwwDir**           : The local folder where your website is hosted  
* **browserSyncProxy** : The host to use for browser-sync. You can create a virtualhost or directly use localhost.  
* **extensions**       : Object containing the list of extensions available on your repository  

Sample extensions definition:

```
	"extensions"       : {
		"components" : ["content"],
		"libraries"  : ["joomla"],
		"media"      : ["joomla"],
		"modules"    : {
			"backend"        : ["quickicon"]
			"frontend"       : ["latest-articles"]
		},
		"plugins"    : {
			"authentication" : ["joomla"],
			"content"        : ["emailcloak"],
			"system"         : ["languagecode"]
		},
		"templates"  : {
			"frontend"       : ["protostar"]
		}
	}
```

For this example, you would then need to create these files:

```
joomla-gulp-extensios/components/content.js
joomla-gulp-extensios/libraries/joomla.js
joomla-gulp-extensios/media/joomla.js
joomla-gulp-extensios/backend/quickicon.js
joomla-gulp-extensios/frontend/quickicon.js
joomla-gulp-extensios/authentication/joomla.js
joomla-gulp-extensios/content/emailcloak.js
joomla-gulp-extensios/system/languagecode.js
joomla-gulp-extensios/templates/frontend/protostar.js
```

If you want an example of a project that uses joomla-gulp, have a look at [`mod_phproberto_ghcard`](https://github.com/phproberto/mod_phproberto_ghcard).


## <a name="naming-conventions"></a>4. Naming conventions

The system is build on a hierarchical task structure in mind. 

### <a name="main-level"></a>4.1 Main level

There is the standard gulp call:

`gulp` :  It will clean the test site, copy the new files, start watching for changes on any extension and launch browser sync to start seeing your changes in real time.  

### <a name="second-level"></a>4.2. Second level

You can also call the main tasks separately:  

`gulp clean` : Will clean the test site  
`gulp copy` : Will copy the repo content to the test site  
`gulp watch` : Will watch for file changes on the repo folder and then acting accordingly  

### <a name="third-level"></a>4.3. Third level

And of course you can call the task by extension type:  

`gulp clean:components` : It will clean all the components  
`gulp copy:plugins` : It will copy all the plugins  
`gulp watch:templates` : It will start tracking changes on templates  

### <a name="fourth-level"></a>4.4. Fourth level

Finally you can call tasks specifically from one extension. Examples:  

`gulp copy:components.content` : Copy the content component to the test site  
`gulp clean:plugins.authentication.joomla` : Clean the Joomla authentication plugin from the test site.  
`gulp watch:media.joomla` : Start watching for changes on the joomla media folder  
`gulp copy:modules.frontend.latest-articles` : Copy a frontend module to the test site.  
`gulp watch:templates.frontend.protostar` : Watch changes on protostar frontend templat  

## <a name="license"></a>License

joomla-gulp is released under the MIT license. See LICENSE for details.  
