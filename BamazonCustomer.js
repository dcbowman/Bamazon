var mysql = require('mysql');
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
		console.log(res[i].ProductName+" | "+res[i].DepartmentName+" | "+res[i].Price+" | "+res[i].StockQuantity);}
	console.log("-----------------------------------");})