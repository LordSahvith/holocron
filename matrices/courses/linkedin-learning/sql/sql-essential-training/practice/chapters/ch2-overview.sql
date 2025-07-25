-- 03 The SELECT statement
-- world.db

SELECT 'Hello, World';
SELECT 'Hello, World' AS Result;
SELECT * FROM Country;
SELECT * FROM Country ORDER BY Name;
SELECT Name, LifeExpectancy FROM Country ORDER BY Name;
SELECT Name, LifeExpectancy AS "Life Expectancy" FROM Country ORDER BY Name;

-- 04 Selecting Rows
-- world.db

SELECT Name, Continent, Region FROM Country;
SELECT Name, Continent, Region FROM Country WHERE Continent = 'Europe';
SELECT Name, Continent, Region FROM Country WHERE Continent = 'Europe' ORDER BY Name;
SELECT Name, Continent, Region FROM Country WHERE Continent = 'Europe' ORDER BY Name LIMIT 5;
SELECT Name, Continent, Region FROM Country WHERE Continent = 'Europe' ORDER BY Name LIMIT 5 OFFSET 5;

-- 05 Selecting Columns
-- world.db

SELECT * FROM Country;
SELECT Name, Continent, Region FROM Country;
SELECT Name AS Country, Continent, Region FROM Country;
SELECT Name AS Country, Region, Continent FROM Country;

-- 06 Counting Rows
-- world.db

SELECT COUNT(*) FROM Country;
SELECT COUNT(*) FROM Country WHERE Population > 1000000;
SELECT COUNT(*) FROM Country WHERE Population > 100000000;
SELECT COUNT(*) FROM Country WHERE Population > 100000000 AND Continent = 'Europe' ;

SELECT COUNT(*) FROM Country;
SELECT COUNT(LifeExpectancy) FROM Country;

-- 07 Inserting Data
-- test.db

SELECT * FROM customer;

INSERT INTO customer (name, city, state)
    VALUES ('Lord Savith', '123 Dromund St', 'Dromund Kaas City', 'Dromund Kaas', 666); 

INSERT INTO customer (name, city, state)
    VALUES ('Spider-Man', 'Queens', 'NY'); 

-- 08 Updating Data
-- test.db

SELECT * FROM customer;
UPDATE customer SET address = '123 Swing Avenue', zip = '98056' WHERE id = 5;
UPDATE customer SET address = '2603 S Washington St', zip = '98056' WHERE id = 5;
UPDATE customer SET address = NULL, zip = NULL WHERE id = 5;

-- 09 Deleting Data
-- test.db

SELECT * FROM customer WHERE id = 4;
DELETE FROM customer WHERE id = 4;
SELECT * FROM customer;
DELETE FROM customer WHERE id = 5;
SELECT * FROM customer;
