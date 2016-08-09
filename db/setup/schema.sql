-- For local auth only at this point. Will change.
DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id serial PRIMARY KEY,
  email text,
  password text,
)

-- Example schema from previous project:
-- DROP TABLE IF EXISTS videos;
-- CREATE TABLE videos(
--   id serial PRIMARY KEY,
--   title text,
--   overview text,
--   release_date date,
--   inventory integer,
--   available_inventory integer
-- );
--
-- DROP TABLE IF EXISTS rentals;
-- CREATE TABLE rentals(
--   id serial PRIMARY KEY,
--   customer_id integer,
--   video_id integer,
--   checkout_date date,
--   due_date date,
--   checkin_date date,
--   charge decimal(9,2)
-- )
