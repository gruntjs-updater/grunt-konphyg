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

#### options.output
Type: `String`
Default value: `'config'`

Where should the expanded configuration files be written

#### options.src
Type: `String`
Default value: `'config'`

Where should the environment specific configuration be read from

### Usage Examples

#### Default Options
No options are required by default.

```js
grunt.initConfig({
  konphyg: {},
});
```

#### Custom Options
The following shows the use of all options.

```js
grunt.initConfig({
  konphyg: {
    options: {
      environments: ['staging', 'qa'],
      indent: 4,
      output: 'config-output',
      src: 'config-input'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
=======
Grunt task to expand a single configuration file into files to be parsed by Konphyg
