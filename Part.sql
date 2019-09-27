
DROP DATABASE IF EXISTS bamazong_db;

CREATE DATABASE bamazong_db;

USE bamazong_db;

CREATE TABLE product (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(33) NOT NULL,
    department_name VARCHAR(55) NOT NULL,
    price DECIMAL(12, 4) NOT NULL,
    stock_quantity DECIMAL(12) NOT NULL,
    PRIMARY KEY (item_id)
)
