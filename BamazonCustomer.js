	var mysql = require("mysql");
	var inquirer = require("inquirer")

	global.inStock = [];
	global.itemID = [];
	var userSelection = [];
	var userAmount = [];
	var storeHas = false;


	var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "",
		database: "BamazonDB"
	});

//establishing connection
	connection.connect(function(err) {
		if(err) {
			throw err;
		}
		
		console.log("connected as id", connection.threadId);
		
	});


//reading SQL

	connection.query('SELECT * FROM products', function(err,results) {
		if(err) {
			throw err;
		}

//reading inventory to customer
		for(var i = 0; i <results.length; i++){
			inStock.push(results[i].stockQuantity);
			itemID.push(results[i].id);

			console.log("-------Select Items------");
			console.log()
			console.log(results[i].productName)
			console.log("Price: " + results[i].price)
			console.log("Left in Stock: " + results[i].stockQuantity)
            console.log("Department " + results[i].departmentName)
            console.log("Product ID: " + results[i].id)
            console.log()
		}

		prompter();
	
	});
		


var prompter = function(){
	inquirer.prompt([

	{
		type:"input",
		message:"What is the ID of the item you would like to purchase?",
		name:"ID"
	},
	{
		type:"input",
		message:"How many would you like to buy?",
		name:"number"
	},
	{
		type:"confirm",
		message:"Purchase items?",
		name:"confirm",
		default: true
	}
	
	]).then(function(user) {
		   
		if (user.confirm == true) {
				console.log("Processing your request");

				for (var i = 0; i < itemID[i]; i++) {
					
					if (user.ID == itemID[i]) {
						storeHas=true;
					
					}
				}

			if(storeHas) {

				userSelection = user.ID-1;
				userAmount = user.number;
				inventory();
				
			}
			
		}
   		
	});
};

//pulling userInventory
	var inventory = function(num){

		connection.query('SELECT * FROM products', function(err,results) {
			if(err) {
				throw err;
			}

			var pickedProduct = results[userSelection]
			var whatsLeft = (pickedProduct.stockQuantity - userAmount)


			if(pickedProduct.stockQuantity >= userAmount){
				console.log("Your purhcase of " + userAmount + " " + pickedProduct.productName + "(s)" + " totals " + (pickedProduct.price * userAmount));

				connection.query('UPDATE products SET ? WHERE ?',[{
					stockQuantity: whatsLeft
				}, {
					stockQuantity: pickedProduct.stockQuantity
				}], function(err,results) {
					if(err) throw err;
					// console.log(results)
	
			     });

		    } 	else {
		    	console.log("We're sorry, we only have " + pickedProduct.stockQuantity + " of " + pickedProduct.productName+"(s)")
		    					
		    }

	   });
	  
	};






