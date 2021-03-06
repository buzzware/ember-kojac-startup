/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here

	  'ember-cli-babel': { includePolyfill: true }  // https://www.bountysource.com/issues/44443470-requirements-to-use-this-package

    //babel: {
    //  plugins: [
	   //   ["babel-plugin-transform-builtin-extend", {
		 //     globals: ["Error"]
	   //   }]
    //    //[require('babel-plugin-transform-object-rest-spread').default, /* any options needed for it */]
    //  ]
    //}
  });


  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

	app.import('bower_components/popper.js/dist/umd/popper.js');
	app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/simpleStorage/simpleStorage.js');
  app.import('vendor/shims/simple-storage.js');

	var mockjson = new Funnel('tests/public/mockjson', {
	  destDir: '/assets/mockjson'
	});

  return app.toTree(mockjson);
};
