var mysql = require("mysql");
var inquirer = require("inquirer")

var inStock = [];
var itemID = [];
var storeHas = false;


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function(err) {
	if(err) {
		throw err;
	}
	console.log("connected as id", connection.threadId);
	
});



//read

	connection.query('SELECT * FROM products', function(err,results) {
	if(err) {
		throw err;
	}

//reading inventory to customer
		console.log(results)


// capturing stock quantity and storing to global
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
				console.log("Processing");
				

				for (var i = 0; i < itemID[i]; i++) {
					
					if (user.ID == itemID[i]) {
						storeHas=true;
						console.log("We have your Item.")
						// console.log(user.ID);
						// console.log(itemID);

					}
				}
			

			if(storeHas) {
				console.log("Now checking how many are in stock.")
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



// var inventory = function() {
// 	var inStock = [];
// 	for(var i = 0; i <results.length; i++){
// 		console.log(results[i]);
// 	}



