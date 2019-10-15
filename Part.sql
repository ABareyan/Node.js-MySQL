
DROP DATABASE IF EXISTS bamazong_db;

CREATE DATABASE bamazong_db;

USE bamazong_db;

CREATE TABLE product (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(33) NOT NULL,
    department_name VARCHAR(55) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    stock_quantity DECIMAL(12) NOT NULL,
    product_sales DECIMAL(12, 2),
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(33) NOT NULL,
    over_head_costs DECIMAL(12) NOT NULL,
    product_sales DECIMAL(12),
    total_profit DECIMAL(12),
    PRIMARY KEY (department_id)
)

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('ABSORBER FRONT RH', 'TRANSMISSION', 138.99, 11, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('ABSORBER FRONT LH', 'TRANSMISSION', 138.99, 8, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('AIR CLEANER FILTER', 'ENGINE', 31.25, 28, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('OIL FILTER', 'ENGINE', 8.66, 38, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('BELT', 'ENGINE', 67.78, 7, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('RADIATOR', 'ENGINE', 145.77, 2, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('LAMP REAR RH', 'ELECTRICAL', 109.54, 4, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('LAMP REAR LH', 'ELECTRICAL', 109.54, 4, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('RECEIVER', 'ELECTRICAL', 3421.33, 1, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('FRONT BUMPER', 'BODY', 111.11, 3, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('HOOD', 'BODY', 345.67, 2, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('FRONT DOOR RH', 'BODY', 288.99, 3, null);

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('FRONT DOOR LH', 'BODY', 288.99, 3, null);



INSERT INTO departments (department_name, over_head_costs, product_sales, total_profit)
VALUES ('TRANSMISSION', 500, null, null);

INSERT INTO departments (department_name, over_head_costs, product_sales, total_profit)
VALUES ('ENGINE', 300, null, null);

INSERT INTO departments (department_name, over_head_costs, product_sales, total_profit)
VALUES ('ELECTRICAL', 900, null, null);

INSERT INTO departments (department_name, over_head_costs, product_sales, total_profit)
VALUES ('BODY', 600, null, null);