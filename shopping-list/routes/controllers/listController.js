import * as listService from  "../../services/listService.js";
import { minLength, required, validate, invalid } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";


const showLists = async ({ render, user }) => {
	let data = { name: "", errors: null, lists: await listService.listLists(user.id), is_logged: (user)};
	render("lists.eta", data);
}

const validationRules = { name: [required, minLength(1)] };

const addList = async ({ request, response, user, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	
	const listName = formData.get("list_name");

	let data = { name: listName, errors: null, lists: await listService.listLists(user.id), is_logged: (user)};
	const [passes, errors] = await validate(data, validationRules);

	if (!passes) { 
		data.errors = errors;
		render("lists.eta", data);
	}
	else {
		await listService.addList(user.id, listName);
		response.redirect(`/lists`);
	}

	
}
	
const deleteList = async ({ response, params, user }) => {
	

	await listService.deleteList(params.id, user.id);
 
	response.redirect(`/lists`);
}

const renameList = async ({ request, response, params, user }) => {
	

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	
	const listName = formData.get("list_name");

	let data = { name: listName, errors: null, lists: await listService.listLists(user.id), is_logged: (user)};
	const [passes, errors] = await validate(data, validationRules);

	if (!passes) { 
		data.errors = errors;
		render("lists.eta", data);
	}
	else {
		await listService.renameList(params.id, user.id, listName);
		response.redirect(`/lists`);
	}
}

const orderLists = async ({ request, response }) => {
	const body = request.body({ type: "json" });
    const data = await body.value; // array containing the list ids, in the new order that 
	// needs to be saved.
	if (body) {
		await listService.orderLists(data);
		response.status = 200;
	} else {
		response.status = 404;
	}	
} 

export { showLists, addList, deleteList, renameList, orderLists };
	