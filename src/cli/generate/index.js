const templates = require('../templates');
const fs = require('fs');
const names = require('../names');

module.exports = {
	controller: (model, view, attributes, options)=>{
		let controllerDirectory = `${options.appPath}/controllers/${names.snake(model)}`;
		let controllerPath = `${controllerDirectory}/${names.upperCamel(model)}${names.upperCamel(view)}Controller.ts`;

		if (!fs.existsSync(controllerDirectory))
			fs.mkdirSync(controllerDirectory);

		let controllerTemplatePath = `${options.templatesPath}/controllers/${names.upperCamel(view)}Controller.ts.ejs`;
		if (!fs.existsSync(controllerTemplatePath))
			controllerTemplatePath = `${options.templatesPath}/controllers/BlankController.ts.ejs`;

		templates.load(controllerTemplatePath, model, view, attributes).then((controllerContent)=>{
			console.info(`CREATE ${controllerPath}`);
			fs.writeFileSync(controllerPath,controllerContent);
		});
	},
	view: (model, view, attributes, options)=>{
		let viewDirectory = `${options.appPath}/views/${names.snake(model)}`
		let viewPath = `${names.snake(viewDirectory)}/${names.snake(view)}.html.ejs`

		if (!fs.existsSync(viewDirectory))
			fs.mkdirSync(viewDirectory);

		let viewTemplatePath = `${options.templatesPath}/views/${names.snake(view)}.html.ejs.ejs`;
		if (!fs.existsSync(viewTemplatePath))
			viewTemplatePath = `${options.templatesPath}/views/blank.html.ejs.ejs`;

		templates.load(viewTemplatePath, model, view, attributes).then((viewContent)=>{
			console.info(`CREATE ${names.snake(viewPath)}`);
			fs.writeFileSync(viewPath,viewContent);
		});
	},
	rest: (model, attributes, options)=>{
		let restDirectory = `${options.appPath}/rest/${names.snake(model)}`
		let restPath = `${names.snake(restDirectory)}/${names.snake(rest)}.html.ejs`

		if (!fs.existsSync(restDirectory))
			fs.mkdirSync(restDirectory);

		let restTemplatePath = `${options.templatesPath}/rest/${names.upperCamel(rest)}Rest.ts.ejs`;
		if (!fs.existsSync(restTemplatePath))
			restTemplatePath = `${options.templatesPath}/rest/BlankRest.ts.ejs`;

		templates.load(restTemplatePath, model, rest, attributes).then((restContent)=>{
			console.info(`CREATE ${names.upperCamel(restPath)}`);
			fs.writeFileSync(restPath,restContent);
		});
	}
}
