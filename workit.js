#!/usr/bin/env node

//console.log(process.cwd()); // List directory currently in
var path = require('path');
var program = require('commander');
var fs = require('fs');

var workit = {};
workit.count = 0;
workit.projects = [];

var saveData = function(){
	fs.writeFile("projects.db", JSON.stringify(workit), function (err){
		if (err) throw err;
	});
}

var loadData = function(){
	fs.readFile("projects.db", function(err,data){
    if (!err){
      workit = data;
      saveData();
    }
	});
}
 
loadData();


program
  .version('0.0.0')

program
  .command('add [ProjectName]')
  .description('register / add a project folder to WorkIT')
  .action(function(projectName){
  		var loc = process.cwd() + "/" + projectName;
        console.log('Project Name: ' + projectName);
        console.log('Location: ' + loc);
        workit.projects.push({name: projectName, location: loc});
        saveData();
});

program
  .command('list')
  .description('lists all projects registered in WorkIT')
  .action(function(projectName){
  		console.log(workit.projects.length);
  		for (var i = 0; i < workit.projects.length; i++){
  			console.log(i);
  		}
});

program.parse(process.argv);

















