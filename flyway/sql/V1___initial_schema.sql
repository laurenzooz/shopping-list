CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE,
	password CHAR(60)
);

CREATE TABLE shopping_lists (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	position INTEGER,
	name TEXT NOT NULL
);

CREATE TABLE shopping_list_items (
	id SERIAL PRIMARY KEY,
	shopping_list_id INTEGER REFERENCES shopping_lists(id),
	position INTEGER,
	name TEXT NOT NULL,
	collected BOOLEAN DEFAULT FALSE
);

CREATE UNIQUE INDEX ON users((lower(email)));
