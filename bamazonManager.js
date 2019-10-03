// Table head

var tableHead = [
    'Product ID',
    'Product Name',
    'Department Name',
    'Product Price',
    'Stock Quantity'
];

// Requires
var mysql = require("mysql");

var inquirer = require('inquirer');

var Table = require('cli-table');

// End of requires

var divider = "\n====================================================================\n";


var green = "\x1b[32m%s\x1b[0m";

// Connection to database

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourpasswordhere",
    database: "bamazong_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    runManager();
});

var runManager = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Dear Manager what would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                showProducts();
                break;
            case "View Low Inventory":
                inventoryProducts();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit":
                exit();
                break;
        }
    });
}

var showProducts = function() {
    var query = "SELECT * FROM product";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: tableHead
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name,
                res[i].department_name, res[i].price, res[i].stock_quantity
            ]);
        }

        console.log(divider);
        console.log(green, "On the table below you can see the products available for sale!");
        console.log(divider);


        console.log(table.toString());
        runManager();
    })
};

var inventoryProducts = function() {

    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "Please specify the least amount of products",
        validate: function(value) {
            if (isNaN(value) === false) return true;
            else return false;
        }
    }).then(function(answer) {

        var query = "SELECT * FROM product WHERE stock_quantity <" + answer.quantity;
        connection.query(query, function(err, res) {
            if (err) throw err;

            if (res.length === 0) {
                console.log(divider);
                console.log(green, "We don't have products less than " + answer.quantity + " unit");
                console.log(divider);
                runManager();
            } else {
                var table = new Table({
                    head: tableHead
                });

                for (var i = 0; i < res.length; i++) {
                    table.push([res[i].item_id, res[i].product_name,
                        res[i].department_name, res[i].price, res[i].stock_quantity
                    ]);
                };

                console.log(divider);
                console.log(green, "In the table below you can see the products' list with quantities of less than " + answer.quantity);
                console.log(divider);

                console.log(table.toString());
                runManager();


            }
        })
    });
};

var addInventory = function() {
    var query = "SELECT * FROM product";
    connection.query(query, function(err, res) {
        if (err) throw err;
        inquirer.prompt([

            {
                name: "poroductID",
                type: "input",
                message: "Select Product Id for add inventory",
                validate: function(value) {
                    if (isNaN(value) === false) return true;
                    else return false
                }
            },
            {

                name: "productQuantity",
                type: "input",
                message: "How many units of the product would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) return true;
                    else return true;
                }
            }
        ]).then(function(answer) {
            var managerID = answer.poroductID - 1;
            var managerQuantity = parseFloat(answer.productQuantity);
            var addQuantity = parseFloat(res[managerID].stock_quantity + managerQuantity);

            inquirer.prompt({
                name: "confirmAdd",
                type: "confirm",
                message: "Are you going to add " + res[managerID].product_name + " " + managerQuantity + " units?"
            }).then(function(answ) {
                if (answ.confirmAdd) {
                    connection.query("UPDATE product SET ? WHERE ?", [

                        {
                            stock_quantity: addQuantity
                        },
                        {
                            item_id: res[managerID].item_id
                        }
                    ], function(err, result) {
                        if (err) throw err;
                        console.log(divider);
                        console.log(green, "Quantity added!!\n\n" + res[managerID].product_name + " " + managerQuantity + " units");
                        console.log(divider);
                        runManager();
                    });
                } else runManager();
            });

        });
    });

};

var addProduct = function() {

    // array with departments name
    var depatrmentList = [];

    var query = "SELECT * FROM departments";
    connection.query(query, function(error, response) {
        if (error) throw error;

        for (var i = 0; i < response.length; i++) {
            depatrmentList.push(response[i].department_name);
        }

        inquirer.prompt([

            {
                name: "productName",
                type: "input",
                message: "Type Product name"
            },
            {
                name: "departmentName",
                type: "list",
                message: "Choose Department",
                choices: depatrmentList
            },
            {
                name: "productPrice",
                type: "input",
                message: "Type the price"
            },
            {
                name: "productQuantity",
                type: "input",
                message: "Type the quantity"
            }

        ]).then(function(answer) {

            var productName = answer.productName.toUpperCase();
            var departmentName = answer.departmentName.toUpperCase();
            var productPrice = parseFloat(answer.productPrice);
            var productQuantity = parseFloat(answer.productQuantity)

            var query = "INSERT INTO product SET ?";
            connection.query(query, [

                {
                    product_name: productName,
                    department_name: departmentName,
                    price: productPrice,
                    stock_quantity: productQuantity
                }
            ], function(err, res) {
                if (err) throw err;

                console.log(divider);
                console.log(green, productQuantity + " units of " + productName + " with price " + productPrice + "$ added in " + departmentName + " department ");
                console.log(divider);

                runManager();
            });

        });
    })
};


var exit = function() {

    console.log(divider);
    console.log(green, "SEE YOU! HAVE A NICE DAY!");
    console.log(divider);

    connection.end();
}