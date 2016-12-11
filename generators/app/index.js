'use strict'

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function(){
        generators.Base.apply(this, arguments);
        //boilerplate out of the way - we can start here
    },
    promptForProjectName: function promptForProjectName() {
        var done = this.async();
        this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Name for your project:',
                default: 'new-project'
            },
            {
                type: 'input',
                name: 'port',
                message: 'Port to run on by default:',
                default: '80'
            }
        ]).then(function(answers) {
            this.props = answers;
            this.log(answers.name);
            done();
        }.bind(this));
    },
    copyConfig: function copyConfig(){
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                name: this.props.name
            }
        )
    },
    copyTemplates: function copyTemplates(){
        this.fs.copyTpl(
            this.templatePath('_public/_index.html'),
            this.destinationPath('public/index.html'), {
                name: this.props.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('_public/_scripts/_main.js'),
            this.destinationPath('public/scripts/main.js'), {
                name: this.props.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('_public/_scripts/_config.js'),
            this.destinationPath('public/scripts/config.js'), {
                name: this.props.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('_app.js'),
            this.destinationPath('app.js'), {
                port: this.props.port,
                name: this.props.name
            }
        );
    },
    installRequireJS: function installRequireJS() {
        this.log('installing requireJS');
        this.npmInstall(['requirejs'], {'save': true});
    },
    installExpress: function installExpress() {
        this.log('installing express');
        this.npmInstall(['express'], {'save': true});
    },
    installD3: function installD3(){
        this.log('installing d3');
        this.npmInstall(['d3'], {'save': true});
    },
    installSocketIO: function installSocketIO() {
        this.log('installing socket.io');
        this.npmInstall(['socket.io'], {'save': true});
    }
});