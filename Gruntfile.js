module.exports = function(grunt) {
  'use strict';

  // load the grunt setup
  require('load-grunt-config')(grunt);
  
  // When we add support for code coverage the test task will have two targets.
  // Because of this I am using grunt.registerMultiTask instead of using  
  // grunt.registerTask.
  grunt.registerMultiTask('test', 'Run JS Unit tests', function () {
      // Get the options for the current target
      var options = this.options();
      
      grunt.log.write(options.baseUrl).ok();
      // In the options for the task you can configure which spec files should be
      // run. We use this to create a list of file names which we can insert into
      // the {{ tests }} placeholder in our HTML template
      var tests = grunt.file.expand(options.files).map(function(file) {
          grunt.log.write(file).ok();
          return '../' + file;
      });

      // build the template by replacing the placeholders for their actual values
      var template = grunt.file.read(options.template).replace('{{ tests }}', JSON.stringify(tests)).replace('{{ baseUrl }}', JSON.stringify(options.baseUrl));

      // write template to tests directory
      grunt.file.write(options.runner, template);

      // Run the tests.
      grunt.task.run('mocha:test');
  });
};
   