	var mysql = require("mysql");
	var inquirer = require("inquirer")

	var inStock = [];
	var itemID = [];
	var userSelection = [];
	var userAmount = [];
	var storeHas = false;




	var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "",
		database: "Bamazon"
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
		console.log(results)


	// capturing stock quantity and storing to global for comparisons
			for(var i = 0; i <results.length; i++){
				inStock.push(results[i].stockQuantity);
				itemID.push(results[i].id);
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


		// var selectedItem = user.ID;
		// console.log(user.number);

// confirm(user)
		



  //  			if (user.ID == itemID) {
  //  				console.log("I'd like to buy this item")
  //  			}
	//    console.log(itemID)
 // console.log(inStock)
        // if(user.number <= inStock) {
      		// console.log("Your FREE order is on the way!")
        // }

        // else {
      		// console.log("I'm sorry")
        // }
   	
	
	});
};

//pulling userInventory
	var inventory = function(num){

		connection.query('SELECT * FROM products', function(err,results) {
			if(err) {
				throw err;
			}


			if(results[userSelection].stockQuantity >= userAmount){
				console.log("Your purhcase of " + userAmount + " " + results[userSelection].productName + "(s)" + " is on it's way!")
			}
		    
		    else {
		    	console.log("We're sorry, we only have " + results[userSelection].stockQuantity + " of those.")
		    }

			 });
	  
	};




