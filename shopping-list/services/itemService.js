import {sql} from "../database/database.js";


//const addList = async(user_id, name) => {
const addItem = async(name, id) => { // user id temporarily disabled
	//await sql `INSERT INTO shopping_lists (user_id, name) VALUES (0, ${name})`;
    await sql `INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ id }, ${ name })`;
}

const listItems = async(id) => { // returns all of the shopping lists of the user
	//return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = (${id})`;
	return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`;
	
}

export { addItem, listItems }