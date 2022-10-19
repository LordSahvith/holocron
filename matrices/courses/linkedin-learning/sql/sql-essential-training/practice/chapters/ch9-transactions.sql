-- 02 transactions
-- test.db

CREATE TABLE widgetInventory (
  id INTEGER PRIMARY KEY,
  description TEXT,
  onhand INTEGER NOT NULL
);

CREATE TABLE widgetSales (
  id INTEGER PRIMARY KEY,
  inv_id INTEGER,
  quan INTEGER,
  price INTEGER
);

INSERT INTO widgetInventory ( description, onhand ) VALUES ( 'rock', 25 );
INSERT INTO widgetInventory ( description, onhand ) VALUES ( 'paper', 25 );
INSERT INTO widgetInventory ( description, onhand ) VALUES ( 'scissors', 25 );

SELECT * FROM widgetInventory;
SELECT * FROM widgetSales;

BEGIN TRANSACTION;
INSERT INTO widgetSales ( inv_id, quan, price ) VALUES ( 1, 5, 500 );
UPDATE widgetInventory SET onhand = ( onhand - 5 ) WHERE id = 1;
END TRANSACTION;

BEGIN TRANSACTION;
INSERT INTO widgetInventory ( description, onhand ) VALUES ( 'toy', 25 );
ROLLBACK;
SELECT * FROM widgetInventory;

-- restore database
DROP TABLE IF EXISTS widgetInventory;
DROP TABLE IF EXISTS widgetSales;
