import {sql} from "../database/database.js";


const addItem = async(name, position, id) => { // adds new item to the list by id

    await sql `INSERT INTO shopping_list_items (shopping_list_id, position, name) VALUES (${ id }, ${position}, ${ name })`;
}

const listUncollectedItems = async(id) => { 
	return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} and collected = false ORDER BY position DESC`;	
}

const listCollectedItems = async(id) => { 
	return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} and collected = true`;	
}

const collectItem = async (item_id, user_id) => {
	
	// can only collect own items
	const item = await sql `SELECT * FROM shopping_list_items WHERE id = ${item_id}`;
	const list_id = item[0].shopping_list_id; 
	// get the shopping list id, then it's user id, and check that it matches with the user
	// who's trying to collect

	const list = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;

	if (list[0].user_id === user_id) {
		await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${item_id};`;
	}

};

const uncollectItem = async (item_id, user_id) => {
	
	// can only collect own items
	const item = await sql `SELECT * FROM shopping_list_items WHERE id = ${item_id}`;
	const list_id = item[0].shopping_list_id; 
	// get the shopping list id, then it's user id, and check that it matches with the user
	// who's trying to collect

	const list = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;

	if (list[0].user_id === user_id) {
		await sql`UPDATE shopping_list_items SET collected = false WHERE id = ${item_id};`;
	}

};

const deleteItem = async(list_id, user_id, item_id) => { 
	// deletes items in the list first, then the list

	// check that the user id matches
	const list = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;
	
	if (list[0].user_id === user_id) {
		await sql `DELETE FROM shopping_list_items WHERE id = ${item_id}`;
	}
	
}


// returns the highest order number
const highestPosition = async(list_id) => { 
	const rows = await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${list_id} ORDER BY position DESC`;
	return rows[0];
}

const lowestPosition = async(list_id) => { 
	const rows = await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${list_id} ORDER BY position ASC`;
	return rows[0];
}

// Swap the position value with one above
const moveUp = async(item_id, upperLimit) => { 

	

	const rows = await sql `SELECT * FROM shopping_list_items WHERE id = ${item_id}`;
	const thisRow = rows[0]


	if (thisRow.position < upperLimit) {
		await sql`UPDATE shopping_list_items SET position = ${thisRow.position} 		WHERE position = ${thisRow.position} + 1`;
		await sql`UPDATE shopping_list_items SET position = ${thisRow.position} + 1  WHERE id = ${item_id}`;
	}
}

const moveDown = async(item_id) => { 

	const rows = await sql `SELECT * FROM shopping_list_items WHERE id = ${item_id}`;
	const thisRow = rows[0]

	if (thisRow.position > 0) {
		await sql`UPDATE shopping_list_items SET position = ${thisRow.position} 		WHERE position = ${thisRow.position} - 1`;
		await sql`UPDATE shopping_list_items SET position = ${thisRow.position} - 1  WHERE id = ${item_id}`;
	}
}

export { addItem, listUncollectedItems, listCollectedItems, collectItem, uncollectItem, deleteItem, highestPosition, lowestPosition, moveUp, moveDown }