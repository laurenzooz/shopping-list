import * as listService from  "../../services/listService.js";

const showLists = async ({ render, user }) => {
	render("lists.eta", {lists: await listService.listLists(user.id), is_logged: (user)});
}

const addList = async ({ request, response, user, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const listName = formData.get("list_name");

	let position = 0;
	const row = await listService.highestPosition(user.id);
	if (row)
	{
		position = row.position + 1;
	}

	await listService.addList(user.id, position, listName);

	response.redirect(`/lists`);
}
	
const deleteList = async ({ request, response, params, render, user }) => {
	

	await listService.deleteList(params.id, user.id);
 
	response.redirect(`/lists`);
}

const orderList = async ({ request, response, params, render }) => {
	const body = request.body({ type: "json" });
    const data = await body.value;
	console.log(data);

	if (body) {
		response.status = 200;
	} else {
		response.status = 404;
	}
	
} 

const moveUp = async ({ request, response, params, render, user }) => {
	
	let limit = 0;
	const row = await listService.highestPosition(user.id);
	if (row)
	{
		limit = row.position;
	}

	await listService.moveUp(params.id, limit);
 
	response.redirect(`/lists`);
}

const moveDown = async ({ request, response, params, render, user }) => {
	

	await listService.moveDown(params.id);
 
	response.redirect(`/lists`);
}

export { showLists, addList, deleteList, moveUp, moveDown, orderList };
	