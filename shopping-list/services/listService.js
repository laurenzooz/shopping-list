import {sql} from "../database/database.js";

//const addList = async(user_id, name) => {
const addList = async(name) => { // user id temporarily disabled
	//await sql `INSERT INTO shopping_lists (user_id, name) VALUES (0, ${name})`;
	await sql `INSERT INTO shopping_lists (name) VALUES (${name})`;
}

const listLists = async(name) => { // returns all of the shopping lists of the user
	return await sql `SELECT * FROM shopping_lists`;
}


const deleteList = async(id) => { // deletes items in the list first, then the list

	await sql `DELETE FROM shopping_list_items WHERE shopping_list_id = ${id}`;
	await sql `DELETE FROM shopping_lists WHERE id = ${id}`;
}

export { addList, listLists, deleteList }