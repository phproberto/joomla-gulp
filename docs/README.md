# Documentation

## Index  

1. [Install](#install)
    1. [Install node.JS](#install-node)
    2. [Initialise your project's package.json file](#initialise-package)
    3. [Install Gulp](#install-gulp)
    4. [Install joomla-gulp](#install-joomla-gulp)
    5. [Install your Gulp plugins](#install-gulp-plugins)
    7. [Create files/folder structure](#create-gulp-extensions)
    8. [Customise gulp-config.json](#create-config)
    9. [Customise gulp-extensions.json](#create-extensions-config)
    10. [Creating your extensions gulp scripts](#start-writing-extensions)
2. [Naming conventions](#naming-conventions)
    1. [Main level](#main-level)
    2. [Second level](#second-level)
    3. [Third level](#third-level)
    3. [Fourth level](#fourth-level)

## <a name="install"></a>1. Install

### <a name="install-node"></a>1.1. Install node.js

I won't extend here. Visit http://nodejs.org/ or search google.

### <a name="initialise-package"></a>1.2. Initialise your project's package.json file

On your project's folder run:

`npm init`

That will create a package.json file with the information that you provide.  

### <a name="install-gulp"></a>1.3. Install Gulp
Install Gulp globally so it's available in all your projects:  
`sudo npm install -g gulp`  

Install Gulp on your project's folder:  
`npm install --save-dev gulp`  

### <a name="install-joomla-gulp"></a>1.4. Install joomla-gulp

In your project's root:

`npm install --save-dev joomla-gulp`

Additionally you will need to initialise your project with the requirements for `joomla-gulp`. This project only has 3 dependencies. 

You can install dependencies from your project's root:

`npm install --save-dev browser-sync gulp-zip require-dir`

### <a name="install-gulp-plugins"></a>1.5. Install your Gulp plugins

Gulp & npm include a great list of plugins that you can use for your projects. 

I recommend you to look at this [readme's list of available extensions](../README.md#plugins). to start with. You can install any of them with:

`npm install {EXTENSION} --save-dev`

For example to install the Sass compiler:

`npm install gulp-sass --save-dev`

### <a name="create-gulp-extensions"></a>1.6. Create files/folder structure

`joomla-gulp` requires some files/folders to work:  

* **`gulp-config.json`**: Main configuration file. Here we will specify our test website folder, browsersync options, default task to run and anything that requires customisation for your local machine. [See example](./gulp-config.json.sample).
* **`gulp-extensions.json`**: Extension list file. Here we will specify the list of joomla extensions that our Gulp system should control. [See example](./gulp-extensions.json.sample).
* **`gulpfile.js`**: Our main gulp script for the project. It will include the requires. You can use it to override any predefined task or to add specific stuff your extension needs. [See example](./gulpfile.js.sample).
* **`joomla-gulp-extensions`**: Folder that will contain the gulp scripts for all our joomla extensions. [See example](./joomla-gulp-extensions-sample). You can change the name of the folder but ensure that you adjust gulpfile.js require call.

To create required files you can copy the sample files and directories provided by the system to your project root's folder:

```bash
    # Create our config file from the sample file
    cp node_modules/joomla-gulp/gulp-config.json.sample gulp-config.json

    # Create our extensions file from the sample file
    cp node_modules/joomla-gulp/gulp-extensions.json.sample gulp-extensions.json

    # Create our gulpfile.js from the sample file
    cp node_modules/joomla-gulp/gulpfile.js.sample gulpfile.js

    # Create the folder for our extensions gulp scripts from the sample folder
    cp -rT node_modules/joomla-gulp/joomla-gulp-extensions-sample joomla-gulp-extensions
```

### <a name="create-config"></a>1.7. Customise gulp-config.json

Customise the params inside of `gulp-config.json` to fit your project requirements.

#### Configuration options

* **wwwDir**           : The local folder where your website is hosted  
* **browserConfig**    : Configuration to initialise browserSync on your local machine. [See browserSync Documentation](http://www.browsersync.io/docs/options/)   
* **`defaultTasks`** : Tasks that will be executed when you run the gulp command with no parameters. Defaults are:  
	 `["copy", "watch", "browser-sync"]`

### <a name="start-writing-extensions"></a>1.9. Creating your extensions gulp scripts

Time to write the specific code that will handle your extensions. The only requirement for each script is that it includes a task for each of required base task:

* **`clean`** : Task that will remove your extension from the testing website.
* **`copy`**: Task that will copy your extension to the testing website.
* **`watch`**: Task that will watch for changes done to your extension.

If you want to see some existing extensions scripts you can take a look at:

*  [`mod_phproberto_ghcard`](https://github.com/phproberto/mod_phproberto_ghcard/tree/master/joomla-gulp-extensions).


### <a name="create-extensions-config"></a>1.10. Customise gulp-extensions.json

This file contains a list of all the joomla extensions that will include a gulp script. 

A sample definition would be something like:

```
	{
		"components" : ["content"],
		"libraries"  : ["joomla"],
		"media"      : ["joomla"],
		"modules"    : {
			"backend"        : ["quickicon"]
			"frontend"       : ["latest-articles"]
		},
		"packages"   : ["weblinks"],
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

Remember that **`joomla-gulp` expects that any extension added to this list already has the gulp scripts in the joomla-gulp-extensions folder**. Extensions without gulp scripts will throw an error.  

For the previous example, you would then need to create these files:

```
joomla-gulp-extensions/components/content.js
joomla-gulp-extensions/libraries/joomla.js
joomla-gulp-extensions/media/joomla.js
joomla-gulp-extensions/modules/backend/quickicon.js
joomla-gulp-extensions/modules/frontend/latest-articles.js
joomla-gulp-extensions/packages/weblinks.js
joomla-gulp-extensions/plugins/authentication/joomla.js
joomla-gulp-extensions/plugins/content/emailcloak.js
joomla-gulp-extensions/plugins/system/languagecode.js
joomla-gulp-extensions/templates/frontend/protostar.js
```

The only requirement for each script is that it includes a task for each of required base task. If you are using the default system you will need to implement tasks for `copy`, `clean` & `watch`.

If you want an example of a project that uses joomla-gulp, have a look at [`mod_phproberto_ghcard`](https://github.com/phproberto/mod_phproberto_ghcard).

## <a name="naming-conventions"></a>2. Naming conventions

The system is build on a hierarchical task structure in mind. 

### <a name="main-level"></a>2.1 Main level

There is the standard gulp call:

`gulp` :  It will clean the test site, copy the new files, start watching for changes on any extension and launch browser sync to start seeing your changes in real time.  

### <a name="second-level"></a>2.2. Second level

You can also call the main tasks separately:  

`gulp clean` : Will clean the test site  
`gulp copy` : Will copy the repo content to the test site  
`gulp watch` : Will watch for file changes on the repo folder and then acting accordingly  

### <a name="third-level"></a>2.3. Third level

And of course you can call the task by extension type:  

`gulp clean:components` : It will clean all the components  
`gulp copy:plugins` : It will copy all the plugins  
`gulp watch:templates` : It will start tracking changes on templates  

### <a name="fourth-level"></a>2.4. Fourth level

Finally you can call tasks specifically from one extension. Examples:  

`gulp copy:components.content` : Copy the content component to the test site  
`gulp clean:plugins.authentication.joomla` : Clean the Joomla authentication plugin from the test site.  
`gulp watch:media.joomla` : Start watching for changes on the joomla media folder  
`gulp copy:modules.frontend.latest-articles` : Copy a frontend module to the test site.  
`gulp watch:templates.frontend.protostar` : Watch changes on protostar frontend templat  
