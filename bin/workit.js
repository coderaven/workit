#!/usr/bin/env node

//console.log(process.cwd()); // List directory currently in
var path = require('path');
var program = require('commander');
var db = require('dirty')('workit.db');

var projects = {};

db.on('load', function() {
  	if (db.get('projects') === undefined){
  		console.log("error!");
  		projects.count = 0;
		db.set('projects',projects);
	} else {
		projects = db.get('projects');
		projects.count++;
		db.set('projects',projects);
		console.log(db.get('projects').count);
	}  
});


program
  .version('0.0.0')

program
  .command('add')
  .description('add directory to a project')
  .action(function(){
        console.log('Hi my Friend!!!');
});


program.parse(process.argv);