CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	`id` INT NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(50) NOT NULL,
    `departmentName` VARCHAR(50) NOT NULL,
    `price` DECIMAL(10,2) NULL,
    `stockQuantity` INTEGER(100),
    PRIMARY KEY (`id`)

);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Hair Wand", "personal care",29.99, 5);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Vanilla Candle", "Decor",14.98, 3);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Pet Leash", "Pet Products",9.99, 11);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Soccer Ball", "Athletic Supplies",29.98, 8);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Eyeliner", "Personal Care",15.50, 2);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Air Freshener", "Car Products",4.99, 5);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("One Art", "Decor",99.99, 1);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Vanilla Candle", "Decor",14.98, 3);

INSERT INTO products (`productName`, `departmentName`,`price`,`stockQuantity`)
VALUES ("Brake Fluid", "Car Products",7.99, 15);

UPDATE products
SET `productName`= "Chair",`departmentName` = "Decor", `price` = 49.99, `stockQuantity`= 2
WHERE id=2;




SELECT * FROM products;