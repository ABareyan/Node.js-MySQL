// Requires

var mysql = require("mysql");

var inquirer = require('inquirer');

var Table = require('cli-table');

// End of requires

var divider = "\n===================================================\n";

// Connection to database

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dadoshka0706",
    database: "bamazong_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runCustomer();
});

console.log("\n*****************************************************\n");
console.log("Here Are Some Products For Your Car");
console.log("\n*****************************************************\n");

// function to log database
var runCustomer = function() {
    var query = "SELECT * FROM product"
    connection.query(query, function(err, res) {
        if (err) throw err;

        // create table
        var table = new Table({
            head: [
                'Product ID',
                'Product Name',
                'Department Name',
                'Product Price',
                'Stock Quantity'
            ]
        });


        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name,
                res[i].department_name, res[i].price, res[i].stock_quantity
            ]);
        }
        console.log(table.toString());

        inquirer.prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Buy some parts for my car",
                "Compare prices with other stores and exit"
            ]
        }).then(function(answer) {
            switch (answer.action) {

                // Update database and show total price
                case "Buy some parts for my car":

                    inquirer.prompt([

                        {
                            name: "productID",
                            type: "input",
                            message: "What product ID you would like to buy",
                            validate: function(value) {
                                if (isNaN(value) === false) return true;
                                else return false;
                            }

                        },
                        {
                            name: "productQuantity",
                            type: "input",
                            message: "How many units of the product you would like to buy",
                            validate: function(value) {
                                if (isNaN(value) === false) return true;
                                else return false;
                            }
                        }

                    ]).then(function(answer) {

                        var userID = answer.productID - 1;

                        var userQuantity = answer.productQuantity;
                        var totalCost = userQuantity * res[userID].price;
                        var totalData = res[userID].product_sales + totalCost;

                        if (userQuantity <= res[userID].stock_quantity) {
                            console.log(divider);
                            console.log("\x1b[32m%s\x1b[0m", "Your total cost: " + totalCost + "$ + taxes");
                            console.log(divider);

                            var query = "UPDATE product SET ? WHERE ?";
                            connection.query(query, [

                                {
                                    stock_quantity: res[userID].stock_quantity - userQuantity,
                                    product_sales: totalData
                                },
                                {
                                    item_id: res[userID].item_id
                                }

                            ], function(err, res) {

                                if (err) throw err;
                                runCustomer();
                            });

                        } else {
                            console.log(divider);
                            console.log("\x1b[32m%s\x1b[0m", "Please choose quantity no more than: " + res[userID].stock_quantity);
                            console.log(divider);
                            runCustomer();
                        }

                    });
                    break;

                    // Exit 
                case "Compare prices with other stores and exit":
                    console.log(divider);
                    console.log("\x1b[31m%s\x1b[0m", "ALL PRICES ARE SPECIFIED IN THE TABLE ABOVE");
                    console.log(divider);

                    connection.end();
                    break;

            };


        });


    });


};