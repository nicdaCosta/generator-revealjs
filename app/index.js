'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var RevealjsGenerator = module.exports = function RevealjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RevealjsGenerator, yeoman.generators.Base);

RevealjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'talkTitle',
    message: 'What is the title of your talk?',
    default: true
  },{
    name: 'twitter',
    message: 'What is your twitter handle?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.talkTitle = props.talkTitle;
    this.twitter = props.twitter;

    cb();
  }.bind(this));
};

RevealjsGenerator.prototype.app = function app() {
  this.mkdir('slides');
  this.mkdir('slides/css');
  this.mkdir('slides/css/fonts');
  
  this.copy('Muli.ttf', 'slides/css/fonts/Muli.ttf');
  this.template('customTheme.css', 'slides/css/customTheme.css');
  
  this.template('_index.md', 'index.md');

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('index.html', 'slides/index.html');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');

};

RevealjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
