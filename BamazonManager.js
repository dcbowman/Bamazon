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

	mgrAction();
}
function viewInventory(){
	console.log("inv");

	mgrAction();
}
function addInventory(){
	console.log("add");

	mgrAction();
}
function addProduct(){
	console.log("product");

	mgrAction();
}

