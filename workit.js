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
workit.projects = {};

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
        if (workit.projects[projectName] !== undefined){
          console.log("\nYou have already added the project ".red + projectName.cyan + "\n");
        } else {
          console.log("\n");
          var loc = process.cwd() + "/" + projectName;
          console.log('Project Name: '.cyan + projectName);
          console.log('Location: '.cyan + loc);
          console.log("Project Successfully Added!".green);
          workit.count++;
          workit.projects[projectName] = {name: projectName, location: loc};
          saveData();
          console.log("\n");
        }
  });

  program
    .command('list')
    .description('lists all projects registered in WorkIT')
    .action(function(){
        if (workit.count < 1){
          console.log("\nYou haven't added any projects to workit yet.\n".red);
        } else {
          console.log("\nProjects count: " + workit.count);
          console.log("Project Name -> Directory");
          
          var count = 1;
          for(var index in workit.projects) { 
            console.log( util.format("[%d]",count++).rainbow + util.format(" %s",workit.projects[index].name).yellow + " -> " + util.format(" %s",workit.projects[index].location).cyan  );
          }
         
          console.log("\n");
        }
  });

  program
  .command('remove [project-name]')
  .description('remove project from WorkIT')
  .action(function(projectName){
      if (workit.projects[projectName] !== undefined){
        console.log("Project ".red + projectName.cyan + " has been deleted".red);
        delete workit.projects[projectName];
        saveData();
      } else {
        console.log("\nThe Project does not exist or has not yet been registered!".red)
      }
  });

  program.parse(process.argv);
});


















