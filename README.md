# grunt-konphyg

Grunt task to expand a single configuration file into files to be parsed by Konphyg

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-konphyg --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-konphyg');
```

## The "konphyg" task

### Overview
In your project's Gruntfile, add a section named `konphyg` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  konphyg: {
    options: {
      output: 'config',
      src: 'config'
    }
  },
});
```

### Options


#### options.environments
Type: `String`
Default value: `['development', 'production', 'test']`

A list of environment files to be expanded when no target is provided to the Grunt task.
By default, this will read all files from the `src` location in the format:

- `development.json`
- `production.json`
- `test.json`

If you specify a different list, it will be looked up accordingly, e.g. `staging` looks for the file `staging.json`

#### options.indent
Type: `String`
Default value: `2`

Number of spaces for indentation for JSON output files

### Usage Examples

#### Default Options
No options are required by default but at least one target is required.

```js
grunt.initConfig({
  konphyg: {
    target: {}
  },
});
```

#### Custom Options
The following shows the use of all options.

```js
grunt.initConfig({
  konphyg: {
    options: {
      environments: ['staging', 'qa'],
      indent: 4
    },
    target: {
      files: {
        'config-output-dir': 'config-input-dir'
      }
    }
  },
});
```

#### Inline configuration for an environment
You can specify your configuration inline. This is especially useful for development configuration.

This example shows specifying different configuration for a `logger` module for production and development.

The following files would be created:

* config-output-dir/logger.json - contains empty object `{}`
* config-output-dir/logger.development.json - contains `{"level": "debug"}`
* config-output-dir/logger.production.json - contains `{"level": "info"}`
* config-output-dir/logger.test.json - contains `{"enabled": false}`

```js
grunt.initConfig({
  konphyg: {
    files: {
      'config-output-dir': 'config-input-dir'
    },
    development: {
      logger: {
        level: 'debug'
      }
    },
    production: {
      logger: {
        level: 'info'
      }
    },
    test: {
      logger: {
        enabled: false
      }
    }
  },
});
```

## Contributing

* In lieu of a formal styleguide, take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality.
* Lint and test your code using `grunt jshint`

## Release History

### 0.4 ###

* 0.4.0
    * Export all configuration via grunt.config so they can be used in other grunt tags

### 0.3 ###

* 0.3.1: Minor code formatting and cleanup
* 0.3.0:
    * Allow inline config specification
    * Use grunt standard src:dest format
    * Add documentation

### 0.2 ###

* 0.2.0:
    * Turn into multi-task
    * Handle missing files
    * Always create output dire

### 0.1 ###

Initial release