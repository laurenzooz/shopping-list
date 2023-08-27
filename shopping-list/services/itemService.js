import {sql} from "../database/database.js";


const addItem = async(name, id) => { // adds new item to the list by id
    await sql `INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ id }, ${ name })`;
}

const listItems = async(id) => { // lists all the items in the shopping list with the given id 
	return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`;
	
}

export { addItem, listItems }