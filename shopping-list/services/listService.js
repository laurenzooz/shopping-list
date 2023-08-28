import {sql} from "../database/database.js";

const addList = async(user_id, position, name) => {
	await sql `INSERT INTO shopping_lists (user_id, position, name) VALUES (${user_id}, ${position}, ${name})`;
}

const listLists = async(user_id) => { // returns all of the shopping lists of the user
	return await sql `SELECT * FROM shopping_lists WHERE user_id = ${user_id} ORDER BY position DESC`; // highest order num to lowest
}


const deleteList = async(list_id, user_id) => { 
	// deletes items in the list first, then the list

	// check that the user id matches
	const list = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;
	
	if (list[0].user_id === user_id) {
		await sql `DELETE FROM shopping_list_items WHERE shopping_list_id = ${list_id}`;
		await sql `DELETE FROM shopping_lists WHERE id = ${list_id}`;
	}
	
}



// returns the highest order number of the lists the user with user_id has
const highestPosition = async(user_id) => { 
	const rows = await sql `SELECT * FROM shopping_lists WHERE user_id = ${user_id} ORDER BY position DESC`;
	return rows[0];
}

const lowestPosition = async(user_id) => { 
	const rows = await sql `SELECT * FROM shopping_lists WHERE user_id = ${user_id} ORDER BY position ASC`;
	return rows[0];
}

// Swap the position value with one above
const moveUp = async(list_id, upperLimit) => { 

	const rows = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;
	const thisRow = rows[0]

	if (thisRow.position < upperLimit) {
		await sql`UPDATE shopping_lists SET position = ${thisRow.position} 		WHERE position = ${thisRow.position} + 1`;
		await sql`UPDATE shopping_lists SET position = ${thisRow.position} + 1  WHERE id = ${list_id}`;
	}
}

const moveDown = async(list_id) => { 

	const rows = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;
	const thisRow = rows[0]

	if (thisRow.position > 0) {
		await sql`UPDATE shopping_lists SET position = ${thisRow.position} 		WHERE position = ${thisRow.position} - 1`;
		await sql`UPDATE shopping_lists SET position = ${thisRow.position} - 1  WHERE id = ${list_id}`;
	}
	

}




export { addList, listLists, deleteList, highestPosition, lowestPosition, moveUp, moveDown }