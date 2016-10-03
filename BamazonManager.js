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
		

		switch (user.manager) {

			case "View Products for Sale":
			    viewProducts();
			    break;

			case "View Low Inventory":
				viewLow();
			  	break;
	
			case "Add to Inventory":
				addInventory();
			  //   //Statements executed when the result of expression matches valueN
			    break;

			default:
			    newProduct();
			  	break;
}
  

	
	
	});
};

 prompter();



 var viewProducts = function (){
 	console.log("view products")

 }

 var viewLow = function (){
	console.log("viewLow")
 }

 var addInventory = function (){
	console.log("addInventory")
 }

 var newProduct = function (){
	console.log("new products")
 }