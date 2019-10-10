// Table head

var tableHead = [
    'Department ID',
    'Department Name',
    'Over Head Costs',
    'Product Sales',
    'Total Profit'
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
    password: "your password here",
    database: "bamazong_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSupervisor();
});

var runSupervisor = function() {

    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Dear Supervisor what would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "Exit"
        ]
    }).then(function(answer) {

        switch (answer.action) {
            case "View Product Sales by Department":
                viewProducts();
                break;

            case "Create New Department":
                createDepartment();
                break;
            case "Exit":
                exit();
                break;
        }
    })
}

var viewProducts = function() {

    var query = "SELECT department_id, departments.department_name, over_head_costs, SUM(product.product_sales) AS product_sales, ";
    query += "SUM(product.product_sales) - over_head_costs AS total_profit FROM departments ";
    query += "INNER JOIN product ON departments.department_name = product.department_name GROUP BY department_id ";

    connection.query(query, function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: tableHead
        });

        for (var i = 0; i < res.length; i++) {

            if (res[i].product_sales === null) {
                res[i].product_sales = 0;
            }

            if (res[i].total_profit === null) {
                res[i].total_profit = 0;
            }
            table.push([res[i].department_id, res[i].department_name,
                res[i].over_head_costs, res[i].product_sales, res[i].total_profit
            ]);
        }

        console.log(table.toString());

        runSupervisor();
    });



}


var createDepartment = function() {

    var depatrmentList = [];

    connection.query("SELECT * FROM departments", function(error, result) {
        if (error) throw error;

        var table = new Table({
            head: [
                'Department ID',
                'Department Name',
                'Over Head Costs'
            ]
        });


        for (var i = 0; i < result.length; i++) {
            depatrmentList.push(result[i].department_name);
            table.push([result[i].department_id, result[i].department_name, result[i].over_head_costs])
        }


        console.log(table.toString());

        inquirer.prompt([

            {
                name: "departmentName",
                type: "input",
                message: "Type Deparment name"
            },
            {
                name: "overHead",
                type: "input",
                message: "Type overhead cost",
                validate: function(value) {
                    if (isNaN(value) === false) return true;
                    else return false
                }
            }
        ]).then(function(answer) {


            if (!depatrmentList.includes(answer.departmentName.toUpperCase())) {

                var query = "INSERT INTO departments SET ?";
                connection.query(query, [

                    {
                        department_name: answer.departmentName.toUpperCase(),
                        over_head_costs: parseFloat(answer.overHead)

                    }
                ], function(err, res) {
                    if (err) throw err;

                    console.log(divider);
                    console.log(green, answer.departmentName.toUpperCase() + " with overhead costs: " + parseFloat(answer.overHead) + " has added in departments");
                    console.log(divider);

                    runSupervisor();
                });
            } else {
                console.log(divider);
                console.log(green, "You already have " + answer.departmentName.toUpperCase() + " department in your store");
                console.log(divider);
                runSupervisor();

            }
        });

    });
}

var exit = function() {

    console.log(divider);
    console.log(green, "SEE YOU! HAVE A NICE DAY!");
    console.log(divider);

    connection.end();
}