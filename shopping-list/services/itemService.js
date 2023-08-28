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

const collectItem = async (item_id, user_id) => {
	
	// can only collect own items
	const item = await sql `SELECT * FROM shopping_list_items WHERE id = ${item_id}`;
	const list_id = item[0].shopping_list_id; 
	// get the shopping list id, then it's user id, and check that it matches with the user
	// who's trying to collect

	const list = await sql `SELECT * FROM shopping_lists WHERE id = ${list_id}`;
	
	console.log(list[0].user_id);
	console.log(user_id);

	if (list[0].user_id === user_id) {
		await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${item_id};`;
	}

};

export { addItem, listUncollectedItems, listCollectedItems, collectItem }