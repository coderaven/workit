#!/usr/bin/env node

//console.log(process.cwd()); // List directory currently in
var path = require('path');
var program = require('commander');
var fs = require('fs');

// Basic File Data Structure
var workit = {};
workit.count = 0;
workit.projects = [];

var saveData = function(callback){
	fs.writeFile("projects.db", JSON.stringify(workit), function (err){
		if (err) throw err;
    else {
      if (!(callback === undefined)){
        callback();
      }
    }
	});
}

var loadData = function(callback){
	fs.readFile("projects.db", function(err,data){
    if (!err) {
      workit = JSON.parse(data);
    } 

    saveData(callback);
	});
}
 

loadData(function(){
  program
  .version('0.0.0')

  program
    .command('add [ProjectName]')
    .description('register / add a project folder to WorkIT')
    .action(function(projectName){
        var loc = process.cwd() + "/" + projectName;
          console.log('Project Name: ' + projectName);
          console.log('Location: ' + loc);
          console.log("Project Successfully Added!");
          workit.count++;
          workit.projects.push({name: projectName, location: loc});
          saveData();
  });

  program
    .command('list')
    .description('lists all projects registered in WorkIT')
    .action(function(projectName){
        console.log(workit.count++);
  });

  program.parse(process.argv);
});


















