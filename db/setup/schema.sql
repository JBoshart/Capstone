DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id serial PRIMARY KEY,
  facebook_id text,
  pantry_id integer,
  fridge_id integer,
  freezer_id integer,
  score integer,
  name text,
  username text
);

DROP TABLE IF EXISTS fridge;
CREATE TABLE fridge(
  id serial PRIMARY KEY,
  user_id integer,
  items_quantity integer
);

DROP TABLE IF EXISTS items;
CREATE TABLE items(
  id serial PRIMARY KEY,
  user_id integer,
  fridge_id integer,
  name text,
  quantity integer,
  quantity_unit text,
  purchase_date date,
  expiration date
);

DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes(
  id serial PRIMARY KEY,
  user_id integer,
  name text,
  steps text
);
