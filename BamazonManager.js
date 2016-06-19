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
   mgrAction();
})

function mgrAction(){
	inquirer.prompt({
	name: "action",
	type: "rawlist",
	message: "What's on the agenda for today?",
	choices: ["View items for sale", "View low inventory", "Add to inventory", "Add new product"]
}).then(function(answer){
	if (answer.action == "View items for sale"){
		viewItems();
	}
	if (answer.action == "View low inventory"){
		viewInventory();
	}
	if (answer.action == "Add to inventory"){
		addInventory();
	}
	if (answer.action == "Add new product"){
		addProduct();
	}
  })//end of .then
}//end of mgrAction

function viewItems(){
	connection.query('SELECT * FROM Products',function(err,res){
	for(var i=0;i<res.length;i++){
		console.log(res[i].ProductName+" | "+res[i].DepartmentName+" | "+ "$"+res[i].Price+" | "+res[i].StockQuantity +" on hand");} //will list all of the items available pretty
	console.log("-----------------------------------");})

	//mgrAction(); //restarts manager options
}//end of viewItems
function viewInventory(){
	connection.query('SELECT * FROM Products WHERE StockQuantity <= 5',function(err,res){
		for (var i = 0; i < res.length; i++){
		console.log(res[i].ProductName+" | "+res[i].DepartmentName+" | "+ "$"+res[i].Price+" | "+res[i].StockQuantity +" on hand");
		}//end of for loop
    })//end of query function
	//mgrAction();

}//end of viewInventory

function addInventory(){
	
	inquirer.prompt([{
	type:'input',
       	message: 'Which item quantity are you updating?',
       	name: 'theItem'
       	},{
       	type:'input',
       	message: 'How much inventory are you adding?',
       	name: 'addAmt'
       }]).then(function (answers){

      connection.query('SELECT * FROM Products WHERE ProductName = ?', answers.theItem, function(err,res){
      	for (var i = 0; i < res.length; i++){
		var newQuantity= (answers.addAmt + res[i].StockQuantity);
		console.log(newQuantity);

		}//end of for
     })//end of query
	})//end of .then
	//mgrAction();
}
function addProduct(){
	inquirer.prompt([{
        type: 'input',
        message: 'Please enter the item description to add',
        name: 'itemDescription'
       },{
       	type:'input',
       	message: 'Please enter the department',
       	name: 'dept'
       	},{
       	type:'input',
       	message: 'Please enter the price',
       	name: 'custPrice'
       	},{
       	type:'input',
       	message: 'What is the current quantity',
       	name: 'stock'
       }]).then(function (answers){
       	
   	connection.query("INSERT INTO products SET ?",{ProductName: answers.itemDescription, DepartmentName: answers.dept, Price: answers.custPrice, StockQuantity: answers.stock},function(err,res){

   		console.log("Item successfully added. Your new inventory:");
   		viewItems(); //calls inventory function that will list all current inventory
   	
   		});//end of query function
	
       })// end of .then


	//mgrAction();
}
//mgrAction();
