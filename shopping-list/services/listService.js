import {sql} from "../database/database.js";


const addList = async(user_id, name) => {
	await sql `INSERT INTO shopping_lists (user_id, name) VALUES (0, ${name})`;
}

export { addList }