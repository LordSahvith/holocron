-- 01 CREATE TABLE
-- test.db

CREATE TABLE test (
  a INTEGER,
  b TEXT
);

INSERT INTO test VALUES ( 1, 'a' );
INSERT INTO test VALUES ( 2, 'b' );
INSERT INTO test VALUES ( 3, 'c' );
SELECT * FROM test;

-- 02 DROP TABLE
-- test.db

CREATE TABLE test ( a TEXT, b TEXT );
INSERT INTO test VALUES ( 'one', 'two' );
SELECT * FROM test;
DROP TABLE test;
DROP TABLE IF EXISTS test;

-- 03 INSERT INTO
-- test.db

CREATE TABLE test ( a INTEGER, b TEXT, c TEXT );

INSERT INTO test VALUES ( 1, 'This', 'Right here!' ); 
INSERT INTO test ( b, c ) VALUES ( 'That', 'Over there!' ); 
INSERT INTO test DEFAULT VALUES;
INSERT INTO test ( a, b, c ) SELECT id, name, description from item;

SELECT * FROM test;

-- 04 DELETE FROM
-- test.db

SELECT * FROM test;
DELETE FROM test WHERE a = 3;
SELECT * FROM test WHERE a = 1;
DELETE FROM test WHERE a = 1;
