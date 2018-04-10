#!/usr/bin/env node

const fs = require('fs');

const names = require('./names');
const generate = require('./generate');

let options = {
	appPath: 'src/app',
	templatesPath: 'src/templates'
}

let command = process.argv[2];
if (command === 'generate' || command === 'g'){
	let scope = process.argv[3];

	if (scope === 'pair'){
		let model = process.argv[4];
		let view = process.argv[5];
		let attributes = process.argv.slice(6).map(a => {
			return {
				name: a.split(':')[0],
				type: a.split(':')[1] || "text"
			}
		});

		generate.controller(model, view, attributes, options);
		generate.view(model, view, attributes, options);
	}else if(scope === 'controller'){
		let model = process.argv[4];
		let view = process.argv[5];
		let attributes = process.argv.slice(6).map(a => {
			return {
				name: a.split(':')[0],
				type: a.split(':')[1] || "text"
			}
		});

		generate.controller(model, view, attributes, options);
	}else if(scope === 'view'){
		let model = process.argv[4];
		let view = process.argv[5];
		let attributes = process.argv.slice(6).map(a => {
			return {
				name: a.split(':')[0],
				type: a.split(':')[1] || "text"
			}
		});

		generate.view(model, view, attributes, options);
	}else if(scope === 'rest'){
		let model = process.argv[4];
		let attributes = process.argv.slice(5).map(a => {
			return {
				name: a.split(':')[0],
				type: a.split(':')[1] || "text"
			}
		});

		generate.rest(model, attributes, options);
	}
}else if(command === 'help'){
	console.info(`Usage:
paperframe new APP_PATH # Create an Paperframe Application
paperframe generate controller MODEL VIEW [ATTRIBUTE:TYPE] # Create a ModuleController file
paperframe generate view MODEL VIEW [ATTRIBUTE:TYPE] # Create a Template file
paperframe generate rest MODEL [ATTRIBUTE:TYPE] # Create a Rest file
paperframe generate pair MODEL VIEW [ATTRIBUTE:TYPE] # Create a ModuleController and Template files
	`);
}
