	var inquirer = require("inquirer");
	var mysql = require("mysql");
	var viewProducts = []; 
	var viewLow = [];
	var addInventory = [];
	


	var connection = mysql.createConnection({
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
	

		connection.query('SELECT * FROM products', function(err,results) {
			if(err) {
				throw err;
			}


		    //reading inventory to manager
				viewProducts = function () {
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
		        	}

		        viewLow = function() {
					for(var i = 0; i <results.length; i++){
						if(results[i].stockQuantity < 5) {
							console.log(results[i].productName + ": " + results[i].stockQuantity + " left")
		  					}	            	
		           	 	}
		       		}

		        addInventory = function (){
		        
		        	inquirer.prompt([

							{
								name:"update",
								type:"input",
								message:"What is ID of Item you would like to add?"
								
							},

							{
								name:"howMany",
								type:"input",
								message:"How many would you like to add?"
								
							},
							{
								type:"confirm",
								message:"Submit",
								name:"confirm",
								default: true
							}
		
							]).then(function(user) {
					
								var index = parseInt(user.update-1);

			                    var added = parseInt(user.howMany);
			                   
	 							var amountAdded = added + results[index].stockQuantity;

									connection.query('UPDATE products SET ? WHERE ?', [{
	 	         						stockQuantity: amountAdded
	 	         					}, {
	 	         						id: user.update
	 	         					}
	 	         					
	 	         					], function(err,results) {
			       						if(err) 
			       							throw err;
			       						
			       						console.log(results);
			       						console.log(user.update)

	
							 });

	       			   });
				};
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
					viewProducts();
					addInventory();
				    break;

				default:
				    newProduct();
				  	break;
			}
		
		});
	};

	 mPrompter();



	 var newProduct = function (){
		console.log("new products")
	 }