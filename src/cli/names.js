module.exports = {
	upperCamel: function(name){
		let lower = this.lowerCamel(name);
		return lower[0].toUpperCase()+lower.slice(1);
	},
	lowerCamel: function(name){
		return name.replace(/\ \w/g,(b)=>b.slice(1).toUpperCase());
	},
	snake: function(name){
		return name.toLowerCase().replace(/\ /g,'_');
	}
}
