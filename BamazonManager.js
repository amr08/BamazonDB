 var inquirer = require("inquirer");



var prompter = function(){
	inquirer.prompt([

	{
		name:"manager",
		type:"rawlist",
		message:"What would you like to do?",
		choices:["View Products for Sale",
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product"]
	},
	{
		type:"confirm",
		message:"Continue?",
		name:"confirm",
		default: true
	}
	
	]).then(function(user) {
		
      
		
		
   	
	
	});
};


 prompter();