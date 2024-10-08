import {sql} from "../database/database.js";

const addList = async(user_id, name) => {
	await sql `INSERT INTO shopping_lists (user_id, position, name) VALUES (${user_id}, 999, ${name})`;
	// 'Infinity' didn't work, use 999 temporarily so new items gets added to bottom of the list

}

const listLists = async(user_id) => { // returns all of the shopping lists of the user
	return await sql `SELECT * FROM shopping_lists WHERE user_id = ${user_id} ORDER BY position`; // highest order num to lowest
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


const renameList = async(list_id, user_id, name) => { 

	// check that the user id matches
	const list = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;
	
	if (list[0].user_id === user_id) {
		await sql `UPDATE shopping_lists SET name = ${name} WHERE id = ${list_id}`;
	}
	
}

const orderLists = async(newOrder) => { // returns all of the shopping lists of the user
	
	for (let i = 0; i < newOrder.length; i++) {
		const id = newOrder[i]; // the id of the list of which position we want to update
		await sql `UPDATE shopping_lists SET position = ${i} WHERE id = ${id}`;
	}
}






export { addList, listLists, deleteList, orderLists, renameList }