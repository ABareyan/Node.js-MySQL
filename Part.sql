DROP DATABASE IF EXISTS bamazong_db;

CREATE DATABASE bamazong_db;

USE bamazong_db;

CREATE TABLE product (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(33) NOT NULL,
    department_name VARCHAR(55) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    stock_quantity DECIMAL(12) NOT NULL,
    product_sales DECIMAL (12, 2),
    PRIMARY KEY (item_id)
);


CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(33) NOT NULL,
    over_head_costs DECIMAL(12, 2) NOT NULL,
    product_sales DECIMAL (12, 2),
    total_profit DECIMAL (12 ,2),
    PRIMARY KEY (department_id)
);
