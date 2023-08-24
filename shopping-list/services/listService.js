import {sql} from "../database/database.js";


//const addList = async(user_id, name) => {
const addList = async(name) => { // user id temporarily disabled
	//await sql `INSERT INTO shopping_lists (user_id, name) VALUES (0, ${name})`;
	await sql `INSERT INTO shopping_lists (name) VALUES (${name})`;
}

export { addList }