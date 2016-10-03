	var inquirer = require("inquirer");
	var mysql = require("mysql");


		connection = mysql.createConnection({
			host: "localhost",
			port: 3306,
			user: "root",
			password: "",
			database: "Bamazon"
		});

//reading connection
		connection.connect(function(err) {
			if(err) {
				throw err;
			}
			
			console.log("connected as id", connection.threadId);
			
		});

//manager prompt
	var mPrompter = function(){
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

	 mPrompter();



	 var viewProducts = function (){
	 	console.log("view products")

	 	//reading SQL

		connection.query('SELECT * FROM products', function(err,results) {
			if(err) {
				throw err;
			}

	    //reading inventory to manager
			for(var i = 0; i <results.length; i++){
		

				console.log("-------Select Items------");
				console.log()
				console.log(results[i].productName)
				console.log("Price: " + results[i].price)
				console.log("Left in Stock: " + results[i].stockQuantity)
	            console.log("Department " + results[i].departmentName)
	            console.log("Product ID: " + results[i].id)
	            console.log()
			}

			
		});


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