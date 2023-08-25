import {sql} from "../database/database.js";


//const addList = async(user_id, name) => {
const addList = async(name) => { // user id temporarily disabled
	//await sql `INSERT INTO shopping_lists (user_id, name) VALUES (0, ${name})`;
	await sql `INSERT INTO shopping_lists (name) VALUES (${name})`;
}

const listLists = async(name) => { // returns all of the shopping lists of the user
	return await sql `SELECT * FROM shopping_lists`;
}

export { addList, listLists }