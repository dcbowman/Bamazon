var mysql = require('mysql');
var inquirer = require('inquirer');

var connection=mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
})
connection.connect(function(err){
    if(err) throw err;
    console.log("connected");//checks connection
    console.log();})

connection.query('SELECT * FROM Products',function(err,res){
	for(var i=0;i<res.length;i++){
		console.log(res[i].ProductName+" | "+res[i].DepartmentName+" | "+res[i].Price+" | "+res[i].StockQuantity);} //will list all of the items available pretty
	console.log("-----------------------------------");})

//runs the order function
order();

function order(){
inquirer.prompt([{
        type: 'input',
        message: 'Which item would you like to purchase?',
        name: 'itemId'
       },{
       	type:'input',
       	message: 'How many would you like?',
       	name: 'quantity'
       }]).then(function (answers) {
        //console.log(answers.itemID);
        //console.log(answers.quantity);
        connection.query('SELECT * FROM Products WHERE ProductName = ?', answers.itemId, function(err,res){
          if(err) throw err;

          //console.log(res);
  
       //checks to see if the quantity is enough
            if (answers.quantity > res[0].StockQuantity){
            console.log("Woops! That's a hot item! we dont have quite that many in stock. Please select another choice.");

            //restarts
            order();
          }else{
            var total = answers.quantity * res[0].Price //calculates the total price

            console.log("Your total for "+answers.quantity +" "+ answers.itemId +" will be " +total +" dollars. Cheers!");

            //updates the inventory onhands
            connection.query('UPDATE Products SET StockQuantity = "'+(res[0].StockQuantity - answers.quantity)+'" WHERE ProductName = "'+answers.itemId+'"');

          }



        })//end of query

        
});//end of.then fucntion
}//end of order function






