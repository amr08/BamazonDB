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
			database: "BamazonDB"
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
				        console.log("Department: " + results[i].departmentName)
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
								message:"What is the ID of Item you would like to add?"
								
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
			       						
			       						console.log("Inventory Updated");
	
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
	 	connection.query('SELECT * FROM products', function(err,results) {
			if(err) {
				throw err;
			}


	 	inquirer.prompt([

			{
			name:"product",
			type:"input",
			message:"Please type the name of the Product you would like to add."
								
			},
			{
			name:"department",
			type:"list",
			choices: function(value) {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].departmentName);
                }
                return choiceArray;
            },
			message:"Please choose Department."					
			},
			{
			name:"price",
			type:"input",
			message: "What is the cost per item. Ex: 1.00:",							
			},
			{
			name:"amount",
			type:"input",
			message: "Quantity",							
			},
			{
			type:"confirm",
			message:"Add items?",
			name:"confirm",
			default: true
			}

			]).then(function(user) {
				

		connection.query('INSERT INTO products SET ?', {
			productName: user.product,
			departmentName: user.department, 
			price: user.price,
			stockQuantity: user.amount 
			}, function(err,results) {
 			if(err) throw err;
 			
 		       console.log(user.product + " has been added to inventory.")
             });
		});
	});
}
