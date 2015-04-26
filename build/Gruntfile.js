module.exports = function(grunt) {
  var files = grunt.file.readJSON('files.json');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: files['source'],
        dest: '../libs/<%= pkg.project %>-<%= pkg.version %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'gzip',
      },
      build: {
        src: '../libs/<%= pkg.project %>-<%= pkg.version %>.js',
        dest: '../libs/<%= pkg.project %>-<%= pkg.version %>.min.js'
      },
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        version: '<%= pkg.version %>',
        description: '<%= pkg.description %>',
        url: '<%= pkg.url %>',
        logo: '<%= pkg.logo %>',
        options: {
          paths: ['../src/'],
          outdir: '../docs/<%= pkg.project %>-<%= pkg.version %>/',
          linkNatives: true,
          attributesEmit: true,
          selleck: true,
          helpers: ['creatineTheme/helpers.js'],
          themedir: "creatineTheme/"
        }
      }
    },
    compress: {
      build: {
        options: {
          mode:'zip',
          archive:'../docs/<%= pkg.project %>_docs-<%= pkg.version %>.zip'
        },
        files: [
          {expand:true, src:'**', cwd:'../docs/<%= pkg.project %>-<%= pkg.version %>/'}
        ]
      }
    },
  });

  // Load the plugin that provides the "uglify" task
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s)
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('docs', ['yuidoc', 'compress']);
};