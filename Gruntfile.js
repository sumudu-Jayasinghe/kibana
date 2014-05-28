/* jshint node:true */
'use strict';
module.exports = function (grunt) {

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    kibanaCheckoutDir: './kibana/vendor/kibana',
    kibanaRevision: '31eeb583cd5508174aa88fda2f51fe9b0b5df9fb',
    agentDir: 'agent',
    buildDir: 'build',
    packageDir: 'build/packages',
    senseDir: './sense',
    testDir: './test',
    esPort: {
      dev: '":'+ (grunt.option('es_port') ||  9200) +'"',
      dist: "(window.location.port !== '' ? ':'+window.location.port : '')"
    },
    ga_tracking_code: {
      dev: 'UA-12395217-6',
      dist: 'UA-12395217-5'
    },
    statsReportUrl: {
      dev: 'http://'+(grunt.option('host') || 'localhost')+':'+ (grunt.option('es_port') ||  9200) +'/.marvel_cluster_report/report',
      dist: 'https://marvel-stats.elasticsearch.com/'
    },
    registrationUrl: {
      dev: 'http://'+(grunt.option('host') || 'localhost')+':'+ (grunt.option('es_port') ||  9200) +'/.marvel_cluster_report/registration',
      dist: 'https://marvel-stats.elasticsearch.com/registration'
    },
    purchaseConfirmationUrl: {
      dev: 'http://'+(grunt.option('host') || 'localhost')+':'+ (grunt.option('es_port') ||  9200) +'/.marvel_cluster_report/purchase_confirmation',
      dist: 'https://marvel-stats.elasticsearch.com/purchase_confirmation'
    },
    kibanaPort: grunt.option('port') ||  5601,
    kibanaHost: grunt.option('host') ||'localhost'
  };

  // more detailed config
  config['buildTempDir'] = config['buildDir'] + '/tmp'; // kibana and custom panels will be merged here
  config['buildSiteDir'] = config['buildDir'] + '/_site';
  config['buildSenseDir'] = config['buildSiteDir'] + '/sense';  // compressed minified sense site will be here
  config['buildKibanaDir'] = config['buildSiteDir'] + '/kibana';  // compressed minified marvel's kibana site will be output here

  // Utility function to load plugin settings into the above config object
  function loadConfig(config, path) {
    require('glob').sync('*', {cwd: path}).forEach(function (option) {
      var key = option.replace(/\.js$/, '');
      // Merge duplicate plugin configs. It is your responsibility to avoid naming collisions
      // in tasks
      config[key] = config[key] || {};
      grunt.util._.extend(config[key], require(path + option)(config, grunt));
    });
    return config;
  }

  // load plugins
  require('load-grunt-tasks')(grunt);

  // Load Marvel tasks. Identical task names will override kibana tasks
  grunt.loadTasks('tasks');
  loadConfig(config, './tasks/options/');

  // pass the config to grunt
  grunt.initConfig(config);

};
