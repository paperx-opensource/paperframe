const fs = require('fs');
const ejs = require('ejs');
const pluralize = require('pluralize');

const names = require('../names');

module.exports = {
	load: (path, model, view, attributes = {})=>{
		return new Promise((resolve,reject)=>{
			ejs.renderFile(path, {
				upperModel: names.upperCamel(model),
				lowerModel: names.lowerCamel(model),
				snakeModel: names.snake(model),
				upperView: names.upperCamel(view),
				lowerView: names.lowerCamel(view),
				snakeView: names.snake(view),
				upperModels: names.upperCamel(pluralize(model)),
				lowerModels: names.lowerCamel(pluralize(model)),
				snakeModels: names.snake(pluralize(model)),
				upperViews: names.upperCamel(pluralize(view)),
				lowerViews: names.lowerCamel(pluralize(view)),
				snakeViews: names.snake(pluralize(view)),
				attributes: attributes
			},(err,str)=>{
				if (err)
					reject(err);
				else
					resolve(str);
			});
		});
	}
}
