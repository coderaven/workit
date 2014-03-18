#!/usr/bin/env node

//console.log(process.cwd()); // List directory currently in
var path = require('path');
var program = require('commander');
var fs = require('fs');

var workit = {
	count: 0,
	projects: []
};

function saveData(){
	fs.writeFile("workit.db", JSON.stringify(workit), function (err){
		if (err) throw err;
	});
}

function initialize(){
	fs.readFile("workit.db", function(err,data){
		if (err){
			fs.writeFile("workit.db", JSON.stringify(workit), function (err){
				if (err) throw err;
			});
		} else {
			workit = JSON.parse(data);
			console.log(workit.count);
			workit.count++;

			saveData();
		}
	});
}


initialize();


program
  .version('0.0.0')

program
  .command('add')
  .description('add directory to a project')
  .action(function(){
        console.log('Hi my Friend!!!');
});


program.parse(process.argv);