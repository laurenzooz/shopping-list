import {sql} from "../database/database.js";


const addItem = async(name, id) => { // adds new item to the list by id
    await sql `INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ id }, ${ name })`;
}

const listUncollectedItems = async(id) => { 
	return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} and collected = false`;	
}

const listCollectedItems = async(id) => { 
	return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} and collected = true`;	
}

const collectItem = async (id) => {
	await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id};`;
};

export { addItem, listUncollectedItems, listCollectedItems, collectItem }