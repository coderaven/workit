#!/usr/bin/env node

//console.log(process.cwd()); // List directory currently in
var path = require('path');
var program = require('commander');
var fs = require('fs');
var util = require('util');
var colors = require("colors");

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
    .command('add [project-name]')
    .description('register / add a project folder to WorkIT')
    .action(function(projectName){
        var loc = process.cwd() + "/" + projectName;
          console.log('Project Name: '.cyan + projectName);
          console.log('Location: '.cyan + loc);
          console.log("Project Successfully Added!".green);
          workit.count++;
          workit.projects.push({name: projectName, location: loc});
          saveData();
  });

  program
    .command('list')
    .description('lists all projects registered in WorkIT')
    .action(function(projectName){
        if (workit.count < 1){
          console.log("\nYou haven't added any projects to workit yet.\n".red);
        } else {
          console.log("\nProjects count: " + workit.count);
          console.log("Project Name -> Directory");
          for (var i = 0; i < workit.count; i++){
            // console.log(util.format("[%d] %s -> %s",i+1,workit.projects[i].name,workit.projects[i].location));
            console.log( util.format("[%d]",i+1).rainbow + util.format(" %s",workit.projects[i].name).yellow + " -> " + util.format(" %s",workit.projects[i].location).cyan  );
          }
          console.log("\n");
        }
  });

  program
  .command('remove [project-name]')
  .description('remove project from WorkIT')
  .action(function(projectName){
      if (workit.count < 1){
        console.log("\nYou haven't added any projects to workit yet.\n");
      } else {
        index = workit.projects.indexOf(projectName);
        if (~index){
          workit.projects.splice(index,1);
          console.log("\nProject deleted.\n".green);
        } else {
          console.log("\nProject does not exists!\n".red);
        }
      }
  });

  program.parse(process.argv);
});


















