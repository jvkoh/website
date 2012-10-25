// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib');

  grunt.initConfig({

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      "dist/release/master.min.css": [
        "public/css/master.css"
      ]
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      dist: {
        src: "dist/debug/jvkoh_website.app.js",
        dest: "dist/release/javascript.min.js"
      }
    },

  });

  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  //grunt.registerTask("debug", "clean requirejs concat");
  //grunt.registerTask("debug", "concat");

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  grunt.registerTask("release", "min mincss");

};
