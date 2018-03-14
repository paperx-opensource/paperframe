#!/usr/bin/env node

const fs = require('fs');

const names = require('./names');
const templates = require('./templates');

let appPath = 'src/app';
let command = process.argv[2];

if (command === 'generate' || command === 'g'){
	let scope = process.argv[3];
	let templatesPath = 'bin/paperframe/templates';

	if (scope === 'scaffold'){
		let model = process.argv[4];
		let view = process.argv[5];
		let attributes = process.argv.slice(6).map(a => {
			return {
				name: a.split(':')[0],
				type: a.split(':')[1] || "text"
			}
		});

		// Controller
		let controllerDirectory = `${appPath}/controllers/${names.snake(model)}`;
		let controllerPath = `${controllerDirectory}/${names.upperCamel(model)}${names.upperCamel(view)}Controller.ts`;

		if (!fs.existsSync(controllerDirectory))
			fs.mkdirSync(controllerDirectory);

		let controllerTemplatePath = `${templatesPath}/controllers/${names.upperCamel(view)}Controller.ts.ejs`;
		if (!fs.existsSync(controllerTemplatePath))
			controllerTemplatePath = `${templatesPath}/controllers/BlankController.ts.ejs`;

		templates.load(controllerTemplatePath, model, view, attributes).then((controllerContent)=>{
			console.info(`CREATE ${controllerPath}`);
			fs.writeFileSync(controllerPath,controllerContent);
		});

		// View
		let viewDirectory = `${appPath}/views/${names.snake(model)}`
		let viewPath = `${names.snake(viewDirectory)}/${names.snake(view)}.html.ejs`

		if (!fs.existsSync(viewDirectory))
			fs.mkdirSync(viewDirectory);

		let viewTemplatePath = `${templatesPath}/views/${names.snake(view)}.html.ejs.ejs`;
		if (!fs.existsSync(viewTemplatePath))
			viewTemplatePath = `${templatesPath}/views/blank.html.ejs.ejs`;

		templates.load(viewTemplatePath, model, view, attributes).then((viewContent)=>{
			console.info(`CREATE ${names.snake(viewPath)}`);
			fs.writeFileSync(viewPath,viewContent);
		});
	}
}
