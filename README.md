# Shopping list web application
This is a simple shopping list web application written in JavaScript using Deno runtime, Oak framework, PostgreSQL and Pico.css stylesheet. 

## Online location
You can try and use the web application here: https://shopping-list-n0xf.onrender.com/

Please note that it takes some time to start up as I'm using the freeware version of render.

## Running locally
If you want to run the application locally, clone the repo and run the command 
	
	docker-compose up

And go to localhost:7777 with your browser. Make sure you have docker installed!

## Database

If you want to use your own database, you can set a following enviroment variable on your system:
	
	DATABASE_URL=[URL]

where [URL] is the url to your postgreSQL database.

If that enviroment variable doesn't exist, flyway will take care of setting up the database when running the docker-compose up command. 

The database schema is as follows:

	CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE,
	password CHAR(60)
	);

	CREATE TABLE shopping_lists (
		id SERIAL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id),
		position INTEGER DEFAULT 0,
		name TEXT NOT NULL
	);

	CREATE TABLE shopping_list_items (
		id SERIAL PRIMARY KEY,
		shopping_list_id INTEGER REFERENCES shopping_lists(id),
		position INTEGER DEFAULT 0,
		name TEXT NOT NULL,
		collected BOOLEAN DEFAULT FALSE
	);

	CREATE UNIQUE INDEX ON users((lower(email)));


## Credits
Thanks to Bernardo-Castilho for making drag and drop on mobile so easy to implement!
https://github.com/Bernardo-Castilho/dragdroptouch
		
