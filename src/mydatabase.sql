BEGIN TRANSACTION;
CREATE TABLE dish (picture VARCHAR, description TEXT, id INTEGER PRIMARY KEY, name VARCHAR);
INSERT INTO dish VALUES(NULL,'',1,'Margaritta');
INSERT INTO dish VALUES(NULL,NULL,2,'Hawajska');
INSERT INTO dish VALUES(NULL,NULL,3,'Rzeźnicka');
INSERT INTO dish VALUES(NULL,NULL,4,'Zapiekanka');
INSERT INTO dish VALUES(NULL,NULL,5,'Hot-dog');
INSERT INTO dish VALUES(NULL,NULL,6,'Tortilla');
INSERT INTO dish VALUES(NULL,NULL,7,'Kebab');
CREATE TABLE dish_ingredients (
	id INTEGER NOT NULL, 
	"idDish" INTEGER, 
	"idIngredients" VARCHAR, 
	PRIMARY KEY (id), 
	FOREIGN KEY("idDish") REFERENCES dish (id), 
	FOREIGN KEY("idIngredients") REFERENCES ingredients (id)
);
INSERT INTO dish_ingredients VALUES(1,1,1);
INSERT INTO dish_ingredients VALUES(2,2,1);
INSERT INTO dish_ingredients VALUES(3,2,2);
INSERT INTO dish_ingredients VALUES(4,2,3);
INSERT INTO dish_ingredients VALUES(5,3,1);
INSERT INTO dish_ingredients VALUES(6,3,2);
INSERT INTO dish_ingredients VALUES(7,3,4);
INSERT INTO dish_ingredients VALUES(8,3,5);
INSERT INTO dish_ingredients VALUES(9,4,1);
INSERT INTO dish_ingredients VALUES(10,5,6);
INSERT INTO dish_ingredients VALUES(11,5,7);
INSERT INTO dish_ingredients VALUES(12,6,8);
INSERT INTO dish_ingredients VALUES(13,6,9);
INSERT INTO dish_ingredients VALUES(14,6,10);
INSERT INTO dish_ingredients VALUES(15,6,11);
INSERT INTO dish_ingredients VALUES(16,6,12);
INSERT INTO dish_ingredients VALUES(17,6,13);
INSERT INTO dish_ingredients VALUES(18,7,13);
INSERT INTO dish_ingredients VALUES(19,7,13);
INSERT INTO dish_ingredients VALUES(20,7,13);
CREATE TABLE dish_sizes (
	id INTEGER NOT NULL, 
	"sizeId" INTEGER, 
	"dishId" INTEGER, 
	price INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY("sizeId") REFERENCES sizes (id), 
	FOREIGN KEY("dishId") REFERENCES dish (id)
);
INSERT INTO dish_sizes VALUES(1,1,1,7.99);
INSERT INTO dish_sizes VALUES(2,2,1,9.99);
INSERT INTO dish_sizes VALUES(3,3,1,12.99);
INSERT INTO dish_sizes VALUES(4,1,2,9.99);
INSERT INTO dish_sizes VALUES(5,2,2,12.99);
INSERT INTO dish_sizes VALUES(6,3,2,15.99);
INSERT INTO dish_sizes VALUES(7,1,3,10.99);
INSERT INTO dish_sizes VALUES(8,2,3,13.99);
INSERT INTO dish_sizes VALUES(9,3,3,16.99);
INSERT INTO dish_sizes VALUES(10,4,4,3.99);
INSERT INTO dish_sizes VALUES(11,5,4,5.99);
INSERT INTO dish_sizes VALUES(12,6,5,2.99);
INSERT INTO dish_sizes VALUES(13,7,5,4.99);
INSERT INTO dish_sizes VALUES(14,4,6,4.99);
INSERT INTO dish_sizes VALUES(15,5,6,6.99);
INSERT INTO dish_sizes VALUES(16,6,7,8.99);
INSERT INTO dish_sizes VALUES(17,7,7,12.99);
CREATE TABLE groups (
	id INTEGER NOT NULL, 
	name VARCHAR NOT NULL, 
	PRIMARY KEY (id)
);
INSERT INTO groups VALUES(1,'Menu');
INSERT INTO groups VALUES(2,'Pizza');
CREATE TABLE ingredients (
	id INTEGER NOT NULL, 
	name VARCHAR NOT NULL, 
	PRIMARY KEY (id)
);
INSERT INTO ingredients VALUES(1,'ser');
INSERT INTO ingredients VALUES(2,'szynka');
INSERT INTO ingredients VALUES(3,'ananas');
INSERT INTO ingredients VALUES(4,'kabanos');
INSERT INTO ingredients VALUES(5,'salami');
INSERT INTO ingredients VALUES(6,'parówka');
INSERT INTO ingredients VALUES(7,'buła');
INSERT INTO ingredients VALUES(8,'ciasto');
INSERT INTO ingredients VALUES(9,'mięso');
INSERT INTO ingredients VALUES(10,'pomidor');
INSERT INTO ingredients VALUES(11,'ogórek');
INSERT INTO ingredients VALUES(12,'sos');
INSERT INTO ingredients VALUES(13,'czosnek');
CREATE TABLE menu (
	id INTEGER NOT NULL, 
	"parentGroup" INTEGER, 
	"childGroup" INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY("parentGroup") REFERENCES groups (id), 
	FOREIGN KEY("childGroup") REFERENCES groups (id)
);
INSERT INTO menu VALUES(1,1,2);
CREATE TABLE menu_leaves (id INTEGER PRIMARY KEY, groupId INTEGER, dishId INTEGER);
INSERT INTO menu_leaves VALUES(1,2,1);
INSERT INTO menu_leaves VALUES(2,2,2);
INSERT INTO menu_leaves VALUES(3,2,3);
INSERT INTO menu_leaves VALUES(4,1,4);
INSERT INTO menu_leaves VALUES(5,1,5);
INSERT INTO menu_leaves VALUES(6,1,6);
INSERT INTO menu_leaves VALUES(7,1,7);
CREATE TABLE sizes (
	id INTEGER NOT NULL, 
	name VARCHAR NOT NULL, 
	PRIMARY KEY (id)
);
INSERT INTO sizes VALUES(1,'10 cm');
INSERT INTO sizes VALUES(2,'15 cm');
INSERT INTO sizes VALUES(3,'30 cm');
INSERT INTO sizes VALUES(4,'mała');
INSERT INTO sizes VALUES(5,'duża');
INSERT INTO sizes VALUES(6,'mały');
INSERT INTO sizes VALUES(7,'duży');
COMMIT;
