import {sql} from "../database/database.js";

const addList = async(user_id, name) => {
	await sql `INSERT INTO shopping_lists (user_id, name) VALUES (${user_id}, ${name})`;
}

const listLists = async(user_id) => { // returns all of the shopping lists of the user
	return await sql `SELECT * FROM shopping_lists WHERE user_id = ${user_id}`;
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

export { addList, listLists, deleteList }